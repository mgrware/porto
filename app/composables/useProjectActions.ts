export interface Project {
  id: number
  title: string
  description: string
  year: string
  tags?: string[]
  color_class: string
  icon: string
  demo_link?: string
  repo_link?: string
  created_at: string
}

import MySwal from 'sweetalert2'

const SwalOptions = MySwal.mixin({
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

const Toast = MySwal.mixin({
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

export const useProjectActions = () => {
  const client = useSupabaseClient()

  const fetchProjects = async () => {
    const { data, error } = await client.from('projects').select('*').order('created_at', { ascending: false })
    if (error) throw error
    return data as Project[]
  }

  const fetchProjectById = async (id: string | number) => {
    const { data, error } = await (client.from('projects') as any)
      .select('*')
      .eq('id', id)
      .single()
    if (error) throw error
    return data as Project
  }

  const createProject = async (project: Omit<Project, 'id' | 'created_at'>) => {
    const { data, error } = await (client.from('projects') as any)
      .insert([project])
      .select()
    if (error) throw error
    return data
  }

  const updateProject = async (id: string | number, updates: Partial<Omit<Project, 'id' | 'created_at'>>) => {
    const { data, error } = await (client.from('projects') as any)
      .update(updates)
      .eq('id', id)
      .select()
    if (error) throw error
    return data
  }

  const deleteProject = async (id: string | number) => {
    const { error } = await (client.from('projects') as any)
      .delete()
      .eq('id', id)
    if (error) throw error
  }

  const deleteProjectWithConfirm = async (id: number | string, onSuccess?: () => void) => {
    const result = await SwalOptions.fire({
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
        await deleteProject(id)
        if (onSuccess) onSuccess()
        Toast.fire({
          icon: 'success',
          title: 'Project deleted successfully'
        })
      } catch (e: any) {
        SwalOptions.fire({
          icon: 'error',
          title: 'Error deleting project',
          text: e.message
        })
      }
    }
  }

  return {
    fetchProjects,
    fetchProjectById,
    createProject,
    updateProject,
    deleteProject,
    deleteProjectWithConfirm,
  }
}
