export const useAuthActions = () => {
  const client = useSupabaseClient()
  const user = useSupabaseUser()
  const router = useRouter()

  const login = async (email: string, password: string) => {
    const { error } = await client.auth.signInWithPassword({
      email,
      password,
    })
    if (error) throw error
    router.push('/dashboard')
  }

  const logout = async () => {
    const { error } = await client.auth.signOut()
    if (error) throw error
    router.push('/login')
  }

  return {
    user,
    login,
    logout,
  }
}
