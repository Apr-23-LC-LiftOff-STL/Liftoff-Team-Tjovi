//package com.liftoff.ecommerce;
//
//
//import com.liftoff.ecommerce.Controllers.AuthenticationController;
//import com.liftoff.ecommerce.Models.User;
//import com.liftoff.ecommerce.Repositories.UserRepository;
//import jakarta.servlet.http.HttpServletRequest;
//import jakarta.servlet.http.HttpServletResponse;
//import jakarta.servlet.http.HttpSession;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.servlet.HandlerInterceptor;
//
//import java.io.IOException;
//import java.util.Arrays;
//import java.util.List;
//
//public class AuthenticationFilter implements HandlerInterceptor {
//
//    @Autowired
//    AuthenticationController authenticationController;
//
//    //white list designates pages that may be accessed by any user, whether logged in or not
//    private static final List<String> whitelist = Arrays.asList("/login", "/register", "/logout");
//
//    //Utility method to determine if a request is whitelisted - iterates through above list checking pathRoot
//    private static boolean isWhitelisted(String path){
//        for (String pathRoot : whitelist){
//            if(path.startsWith(pathRoot)){
//                return true;
//            }
//        }
//        return false;
//    }
//
//    //preHandle called before a request is handled by a controller - returns boolean, if true request processing
//    //continues as normal with appropriate controller method being called. Returns false and process will halt.
//    @Override
//    public boolean preHandle(HttpServletRequest request,
//                             HttpServletResponse response,
//                             Object handler) throws IOException {
//
//        //Checks whether request is whitelisted or not, determining if method needs to continue checking user status
//        if(isWhitelisted(request.getRequestURI())){
//            return true;
//        }
//
//        //Retrieves the user's session object, which is contained in the request
//        HttpSession session = request.getSession();
//
//        //Retrieves the User object corresponding to the given user, This will be null if the user is not logged in
//        User user = authenticationController.getUserFromSession(session);
//
//        //The user object is non-null, so the user is logged in. Allows the request to be handled as normal
//        if(user!=null){
//            return true;
//        }
//
//        //The user object is null and redirects to the login page
//        response.sendRedirect("/login");
//        return false;
//    }
//}
