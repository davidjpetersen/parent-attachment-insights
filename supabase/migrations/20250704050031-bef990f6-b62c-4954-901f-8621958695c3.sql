-- Add admin role for the current user
-- Replace with your actual email address
INSERT INTO public.user_roles (user_id, role) 
SELECT id, 'admin'::app_role 
FROM auth.users 
WHERE email = 'david.petersen@familying.org' 
LIMIT 1;