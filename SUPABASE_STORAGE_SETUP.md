# Supabase Storage Setup Instructions

## Create Storage Buckets

You need to create TWO storage buckets in Supabase:

### 1. Job Images Bucket

1. **Login to Supabase Dashboard**
   - Go to: https://supabase.com/dashboard
   - Navigate to your project: `anpmxdlqhsvndcdimasr`

2. **Create the job-images bucket**
   - Click on **Storage** in the left sidebar
   - Click **New bucket**
   - Bucket name: `job-images`
   - Make bucket public: **YES** ✓
   - Click **Create bucket**

3. **Configure Bucket Policies**
    - There are two safe ways to add policies. Use ONE of the methods below.

    **Method A: UI (Policy Builder) — Recommended**
    - Select the `job-images` bucket → **Policies** → **New Policy**
    - **For uploads**, choose template: **"Allow authenticated uploads"**
      - This creates a policy allowing authenticated users to upload
    - **For downloads**, choose template: **"Allow public downloads"**
      - This creates a policy allowing anyone to view/download files
    
    Or use **"Full customization"** if templates aren't available:
    - Policy 1 (Uploads):
       - Operation: `INSERT`
       - Target roles: `authenticated`
       - Policy definition: `true`
    - Policy 2 (Reads):
       - Operation: `SELECT`
       - Target roles: `public`
       - Policy definition: `true`

    **Method B: SQL Editor**
    - Open **SQL Editor** and run the following statements:
    ```sql
    alter table storage.objects enable row level security;

    create policy "Allow authenticated uploads"
    on storage.objects
    for insert
    to authenticated
    with check (bucket_id = 'job-images');

    create policy "Public read access"
    on storage.objects
    for select
    to anon, authenticated
    using (bucket_id = 'job-images');
    ```

### 2. Applications Bucket (for Resumes)

1. **Create the applications bucket**
   - In the same **Storage** section
   - Click **New bucket**
   - Bucket name: `applications`
   - Make bucket public: **YES** ✓ (needed for resume downloads)
   - Click **Create bucket**

2. **Configure Bucket Policies**
    - Use ONE of the methods below.

    **Method A: UI (Policy Builder) — Recommended**
    - Select the `applications` bucket → **Policies** → **New Policy**
    - **For uploads**, choose template: **"Allow authenticated uploads"**
      - This creates a policy allowing authenticated users to upload
    - **For downloads**, choose template: **"Allow public downloads"**
      - This creates a policy allowing anyone to view/download files
    
    Or use **"Full customization"** if templates aren't available:
    - Policy 1 (Uploads):
       - Operation: `INSERT`
       - Target roles: `authenticated`
       - Policy definition: `true`
    - Policy 2 (Reads):
       - Operation: `SELECT`
       - Target roles: `public`
       - Policy definition: `true`

    **Method B: SQL Editor**
    - Open **SQL Editor** and run:
    ```sql
    alter table storage.objects enable row level security;

    create policy "Allow authenticated resume uploads"
    on storage.objects
    for insert
    to authenticated
    with check (bucket_id = 'applications');

    create policy "Public read access for resumes"
    on storage.objects
    for select
    to anon, authenticated
    using (bucket_id = 'applications');
    ```

> Important: In the UI, paste only the expression (e.g., `bucket_id = 'job-images'`). Do not paste full `CREATE POLICY` SQL into the policy definition box — that will cause a syntax error.

## Testing the Buckets

### Test Job Images:
- After creating the bucket, try posting a job with an image
- The image URL should be: `https://anpmxdlqhsvndcdimasr.supabase.co/storage/v1/object/public/job-images/[filename]`

### Test Resume Uploads:
- After creating the bucket, try applying to a job with a resume
- The resume URL should be: `https://anpmxdlqhsvndcdimasr.supabase.co/storage/v1/object/public/applications/resumes/[jobId]/[filename]`

## Alternative: Use Service Role Key (More Secure)

If you prefer to use the service role key for server-side uploads:

1. Get your service role key from Supabase dashboard:
   - Go to **Settings** → **API**
   - Copy the `service_role` key (not the anon key)

2. Add to `.env`:
   ```
   SUPABASE_SERVICE_ROLE_KEY="your-actual-service-role-key-here"
   ```

3. Update the upload route to use service role key:
   - The route already falls back to service role key if available
   - Restart the dev server after adding the key

## Current Status

- ✅ Schema updated with `imageUrl` field
- ✅ Upload API endpoint created at `/api/upload` (for job images)
- ✅ Applications API endpoint updated at `/api/applications` (for resumes)
- ✅ Job form includes image picker with preview
- ✅ JobCard updated to display images
- ✅ Application form includes resume upload
- ✅ **COMPLETE: `job-images` bucket created in Supabase**
- ✅ **COMPLETE: `applications` bucket created in Supabase**
- ✅ **COMPLETE: Storage policies configured for both buckets**
- ✅ **COMPLETE: Service role key added and tested**
- ✅ **COMPLETE: Job image uploads working**
- ✅ **COMPLETE: Resume uploads working**

## After Setup

Once both buckets are created:

**For Job Images:**
1. Login as a user (or use admin account)
2. Go to `/jobs/post`
3. Fill out the job form and upload an image
4. Submit the job
5. The image should be uploaded to Supabase Storage
6. Job will be created with the image URL
7. After admin approval, the image will display on the job listing

**For Job Applications:**
1. Go to any approved job detail page
2. Click "Apply Now"
3. Fill out the application form
4. Upload your resume (PDF, DOC, DOCX, etc.)
5. Submit the application
6. The resume should be uploaded to Supabase Storage
7. Application will be saved with the resume URL
8. Admin can view and download resumes from the admin panel
