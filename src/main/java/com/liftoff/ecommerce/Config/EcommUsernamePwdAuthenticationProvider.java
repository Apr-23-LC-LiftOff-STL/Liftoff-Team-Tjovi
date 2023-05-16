package com.liftoff.ecommerce.Config;

import com.liftoff.ecommerce.Models.Authority;
import com.liftoff.ecommerce.Models.User;
import com.liftoff.ecommerce.Repositories.UserRepository;
import com.mysql.cj.conf.PropertySet;
import com.mysql.cj.exceptions.ExceptionInterceptor;
import com.mysql.cj.protocol.AuthenticationProvider;
import com.mysql.cj.protocol.Protocol;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Component
public class EcommUsernamePwdAuthenticationProvider implements AuthenticationProvider {

        @Autowired
        private UserRepository userRepository;

        @Autowired
        private PasswordEncoder passwordEncoder;

        //@Override
        public Authentication authenticate(Authentication authentication) throws AuthenticationException {
            String username = authentication.getName();
            String pwd = authentication.getCredentials().toString();
            List<User> user = userRepository.findByEmail(username);
            if (user.size() > 0) {
                if (passwordEncoder.matches(pwd, user.get(0).getPwd())) {
                    return new UsernamePasswordAuthenticationToken(username, pwd, getGrantedAuthorities(user.get(0).getAuthorities()));
                } else {
                    throw new BadCredentialsException("Invalid password!");
                }
            }else {
                throw new BadCredentialsException("No user registered with this details!");
            }
        }

        private List<GrantedAuthority> getGrantedAuthorities(Set<Authority> authorities) {
            List<GrantedAuthority> grantedAuthorities = new ArrayList<>();
            for (Authority authority : authorities) {
                grantedAuthorities.add(new SimpleGrantedAuthority(authority.getName()));
            }
            return grantedAuthorities;
        }

        //@Override
        public boolean supports(Class<?> authentication) {
            return (UsernamePasswordAuthenticationToken.class.isAssignableFrom(authentication));
        }

    @Override
    public void init(Protocol prot, PropertySet propertySet, ExceptionInterceptor exceptionInterceptor) {

    }

    @Override
    public void connect(String username, String password, String database) {

    }

    @Override
    public void changeUser(String username, String password, String database) {

    }
}

