const BASE_NAME = '/structor-deskpage';
export const getRealPathName = pagePath => BASE_NAME + pagePath;
export const getPagePathName = realPath => realPath.replace(BASE_NAME, '');
