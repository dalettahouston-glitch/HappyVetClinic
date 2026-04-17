package com.java.vetclinic.security;

import com.java.vetclinic.service.CustomUserDetailsService;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.security.SignatureException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;
    private final CustomUserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {

        // Step 1: Get the Authorization header from the request.
        final String authHeader = request.getHeader("Authorization");

        // Step 2: If there's no header, or it doesn't start with "Bearer ", skip this filter.
        // Public endpoints (like /api/auth/login) will work fine without a token.
        // Protected endpoints will get a 401 from Spring Security automatically.
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        // Step 3: Extract the token (everything after "Bearer ").
        final String jwt = authHeader.substring(7);

        try {
            // Step 4: Read the username from the token.
            final String username = jwtUtil.extractUsername(jwt);

            // Step 5: If we got a username and there's no authentication set yet...
            if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {

                // Step 6: Load the full user from the database.
                UserDetails userDetails = userDetailsService.loadUserByUsername(username);

                // Step 7: Validate the token (correct user + not expired).
                if (jwtUtil.isTokenValid(jwt, userDetails)) {

                    // Step 8: Tell Spring Security "this user is authenticated for this request".
                    UsernamePasswordAuthenticationToken authToken =
                            new UsernamePasswordAuthenticationToken(
                                    userDetails,                  // the principal (our User object)
                                    null,                         // credentials (not needed, already validated)
                                    userDetails.getAuthorities()  // the user's roles
                            );
                    authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authToken);
                }
            }
        } catch (ExpiredJwtException | MalformedJwtException | SignatureException e) {
            // Token is invalid or expired — don't set any authentication.
            // The request continues as anonymous. Spring Security will
            // return 401/403 for protected endpoints automatically.
        }

        // Step 9: Continue to the next filter or the controller.
        filterChain.doFilter(request, response);
    }
}