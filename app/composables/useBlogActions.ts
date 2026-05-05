export interface BlogPost {
  id: number
  title: string
  slug: string
  content: string
  image_url?: string | null
  excerpt?: string | null
  created_at: string
}

export const useBlogActions = () => {
  const client = useSupabaseClient()

  const fetchBlogs = async () => {
    const { data, error } = await (client.from('blogs') as any)
      .select('*')
      .order('created_at', { ascending: false })
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

  const createBlog = async (post: { title: string; slug: string; content: string; image_url?: string; excerpt?: string }) => {
    const { data, error } = await (client.from('blogs') as any)
      .insert([post])
      .select()
    if (error) throw error
    return data
  }

  const updateBlog = async (id: string | number, updates: { title?: string; slug?: string; content?: string; image_url?: string; excerpt?: string }) => {
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

  return {
    fetchBlogs,
    fetchBlogById,
    fetchBlogBySlug,
    uploadImage,
    createBlog,
    updateBlog,
    deleteBlog,
  }
}
