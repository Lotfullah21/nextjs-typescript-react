## Routing

whatever folder we put in app directory, that will become part of url or segment of url.

Some popular routing options

- Private folders `_folder name`
- Route Groups `(dashboard)`
- Dynamic Routes `[..folder]` - catch all route segments.

## Private folders

What if we don't want some folder to be part of our url segment? Add it to private folder? place `_` before the folder name.
for instance, we do not want images to be part of our url, add the `_` to the folder name (`_images`).

- Private Folder
- `_folder_name`

Lets say we don't want contents folder to be part of the segment, go to app and create a folder `_contents`, now `domain/contents` cannot be accessed.

### Grouping the routes

What if we want to group all the routes, for instance if we have a dashboard and inside the folder we have profile, info, about. It would be tedious to have `dashboard/profile`, `dashboard/about` and so on.

using next, set the folder name with `(foldername)`.

`(dashboard)`

- auth
- profile

When we navigate, we don't navigate `dashboard/profile`, just `/profile` or `/auth`.

## Dynamic routes
