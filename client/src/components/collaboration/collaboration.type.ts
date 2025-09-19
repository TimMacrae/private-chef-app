import { z } from "zod";

export const collaborationsStatusSchema = z.enum([
  "PENDING",
  "ACCEPTED",
  "DECLINED",
]);
export type CollaborationsStatus = z.infer<typeof collaborationsStatusSchema>;

export const collaborationSchema = z.object({
  id: z.string(),
  inviterId: z.string(),
  inviteeId: z.string().nullable(),
  inviteeEmail: z.string().email(),
  status: collaborationsStatusSchema,
  token: z.string(),
  createdAt: z.string(),
  updatedAt: z.string().nullable(),
});
export type Collaboration = z.infer<typeof collaborationSchema>;

export const collaborationsUserSchema = z.object({
  id: z.string(),
  userId: z.string(),
  invitedCollaborations: z.array(collaborationSchema),
  receivedCollaborations: z.array(collaborationSchema),
});
export type CollaborationsUser = z.infer<typeof collaborationsUserSchema>;

export const inviteRequestSchema = z.object({
  email: z.string().email(),
});
export type InviteRequest = z.infer<typeof inviteRequestSchema>;

export const updateStatusRequestSchema = z.object({
  token: z.string(),
  status: collaborationsStatusSchema,
});
export type UpdateStatusRequest = z.infer<typeof updateStatusRequestSchema>;

export const deleteRequestSchema = z.object({
  collaborationId: z.string(),
});
export type DeleteRequest = z.infer<typeof deleteRequestSchema>;
