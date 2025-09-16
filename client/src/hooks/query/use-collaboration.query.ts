import { useQuery } from "@tanstack/react-query";
import { apiConfig } from "@/lib/api/api-config";
import { getCollaborationAction } from "@/app/actions/collaboration-server.actions";

export const useCollaboration = () => {
  return useQuery({
    queryKey: [apiConfig.QUERY_KEYS.COLLABORATION],
    queryFn: getCollaborationAction,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
