export interface BlogPost {
  id: number
  title: string
  slug: string
  content: string
  image_url?: string | null
  excerpt?: string | null
  status?: string
  views?: number
  created_at: string
}

import Swal from 'sweetalert2'

const MySwal = Swal.mixin({
  background: 'rgb(var(--surface-container))',
  color: 'rgb(var(--on-surface))',
  customClass: {
    popup: 'border border-outline-variant',
    title: 'font-headline tracking-tighter text-2xl',
    htmlContainer: 'text-on-surface-variant text-sm font-body',
    confirmButton: 'bg-primary text-on-primary px-6 py-3 font-bold text-mono uppercase tracking-widest mx-2 hover:opacity-90 transition-opacity',
    cancelButton: 'bg-surface-container-highest text-on-surface px-6 py-3 text-mono uppercase tracking-widest hover:opacity-90 transition-opacity mx-2',
  },
  buttonsStyling: false
})

const Toast = Swal.mixin({
  toast: true,
  position: 'bottom-end',
  showConfirmButton: false,
  timer: 3000,
  background: 'rgb(var(--surface-container-high))',
  color: 'rgb(var(--on-surface))',
  customClass: {
    popup: 'border border-outline-variant',
    title: 'text-mono text-sm uppercase tracking-widest',
  }
})

export const useBlogActions = () => {
  const client = useSupabaseClient()

  const fetchBlogs = async (publishedOnly = false) => {
    let query = client.from('blogs').select('*').order('created_at', { ascending: false })
    
    if (publishedOnly) {
      query = query.eq('status', 'published')
    }
    
    const { data, error } = await (query as any)
    if (error) throw error
    return data as BlogPost[]
  }

  const fetchBlogById = async (id: string | number) => {
    const { data, error } = await (client.from('blogs') as any)
      .select('*')
      .eq('id', id)
      .single()
    if (error) throw error
    return data as BlogPost
  }

  const uploadImage = async (file: File) => {
    const fileExt = file.name.split('.').pop()
    const fileName = `${Math.random()}.${fileExt}`
    const filePath = `blog-images/${fileName}`

    const { error: uploadError } = await client.storage
      .from('blogs')
      .upload(filePath, file)

    if (uploadError) throw uploadError

    const { data } = client.storage.from('blogs').getPublicUrl(filePath)
    return data.publicUrl
  }

  const createBlog = async (post: { title: string; slug: string; content: string; image_url?: string; excerpt?: string; status?: string }) => {
    const { data, error } = await (client.from('blogs') as any)
      .insert([post])
      .select()
    if (error) throw error
    return data
  }

  const updateBlog = async (id: string | number, updates: { title?: string; slug?: string; content?: string; image_url?: string; excerpt?: string; status?: string }) => {
    const { data, error } = await (client.from('blogs') as any)
      .update(updates)
      .eq('id', id)
      .select()
    if (error) throw error
    return data
  }

  const deleteBlog = async (id: string | number) => {
    const { error } = await (client.from('blogs') as any)
      .delete()
      .eq('id', id)
    if (error) throw error
  }

  const fetchBlogBySlug = async (slug: string) => {
    const { data, error } = await (client.from('blogs') as any)
      .select('*')
      .eq('slug', slug)
      .single()
    if (error) throw error
    return data as BlogPost
  }

  const incrementBlogViews = async (id: number) => {
    const { error } = await (client.rpc as any)('increment_blog_views', { blog_id: id })
    if (error) {
      console.error('Failed to increment views:', error)
    }
  }

  const toggleBlogStatus = async (post: any, onSuccess?: () => void) => {
    const newStatus = post.status === 'published' ? 'draft' : 'published'
    try {
      // Optimistic update
      post.status = newStatus
      await updateBlog(post.id, { status: newStatus })
      if (onSuccess) onSuccess()
      Toast.fire({
        icon: 'success',
        title: `Status changed to ${newStatus}`
      })
    } catch (e: any) {
      // Revert on error
      post.status = post.status === 'published' ? 'draft' : 'published'
      MySwal.fire({
        icon: 'error',
        title: 'Error updating status',
        text: e.message
      })
    }
  }

  const deleteBlogWithConfirm = async (id: number | string, onSuccess?: () => void) => {
    const result = await MySwal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'YES_DELETE_IT',
      cancelButtonText: 'CANCEL',
      customClass: {
        confirmButton: 'bg-error text-on-error px-6 py-3 font-bold text-mono uppercase tracking-widest mx-2 hover:opacity-90 transition-opacity',
        cancelButton: 'bg-surface-container-highest text-on-surface px-6 py-3 text-mono uppercase tracking-widest hover:opacity-90 transition-opacity mx-2',
        popup: 'border border-outline-variant',
        title: 'font-headline tracking-tighter text-2xl',
        htmlContainer: 'text-on-surface-variant text-sm font-body'
      }
    })

    if (result.isConfirmed) {
      try {
        await deleteBlog(id)
        if (onSuccess) onSuccess()
        Toast.fire({
          icon: 'success',
          title: 'Post deleted successfully'
        })
      } catch (e: any) {
        MySwal.fire({
          icon: 'error',
          title: 'Error deleting post',
          text: e.message
        })
      }
    }
  }

  return {
    fetchBlogs,
    fetchBlogById,
    fetchBlogBySlug,
    uploadImage,
    createBlog,
    updateBlog,
    deleteBlog,
    toggleBlogStatus,
    deleteBlogWithConfirm,
    incrementBlogViews,
  }
}
