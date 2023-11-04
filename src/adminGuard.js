export const adminGuard = (to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAdmin)) {
      // بررسی اگر کاربر ادمین باشد
      const isAdmin = localStorage.getItem('isAdmin') === 'true';
      if (isAdmin) {
        next();
      } else {
        // اگر کاربر ادمین نباشد، به صفحه مورد نظر ادامه ندهید و به صفحه دیگری هدایت کنید
        next('/'); // یا به هر صفحه دلخواهی که شما دوست دارید
      }
    } else {
      next();
    }
  };
  