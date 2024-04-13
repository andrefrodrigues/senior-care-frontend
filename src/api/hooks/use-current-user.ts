import { useQuery } from "react-query"
import { api } from "../requests"
import { useUserStore } from "../../store/user-store"

export const useCurrentUser = () => {
    const userStore = useUserStore();
    return useQuery({ queryKey: 'current-user', queryFn: () => api.currentUser(), enabled:  userStore.isLoggedIn() })
}