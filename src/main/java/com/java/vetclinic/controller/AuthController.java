package com.java.vetclinic.controller;

import com.java.vetclinic.dto.AuthRequest;
import com.java.vetclinic.dto.AuthResponse;
import com.java.vetclinic.dto.RefreshRequest;
import com.java.vetclinic.dto.RegisterRequest;
import com.java.vetclinic.entity.Role;
import com.java.vetclinic.entity.User;
import com.java.vetclinic.repository.UserRepository;
import com.java.vetclinic.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest request) {
        // Step 1: Spring Security checks the username + password against the database.
        // If they're wrong, this line throws an exception and returns 401 automatically.
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.username(), request.password())
        );

        // Step 2: If we get here, the credentials are valid. Look up the user.
        User user = userRepository.findByUsername(request.username()).orElseThrow();

        // Step 3: Generate tokens and send them back.
        String accessToken = jwtUtil.generateAccessToken(user);
        String refreshToken = jwtUtil.generateRefreshToken(user);

        return ResponseEntity.ok(new AuthResponse(accessToken, refreshToken));
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request) {
        // Check if username is already taken
        if (userRepository.findByUsername(request.username()).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }

        // Create the new user with an encrypted password
        User user = User.builder()
                .username(request.username())
                .password(passwordEncoder.encode(request.password()))
                .role(request.role()) // new users always start as ROLE_USER
                .name (request.name())
                .phone(request.phone())
                .email(request.email())
                .build();

        userRepository.save(user);

        // Generate tokens so the user is auto-logged-in after registration
        String accessToken = jwtUtil.generateAccessToken(user);
        String refreshToken = jwtUtil.generateRefreshToken(user);

        return ResponseEntity.ok(new AuthResponse(accessToken, refreshToken));
    }

    @PostMapping("/refresh")
    public ResponseEntity<AuthResponse> refresh(@RequestBody RefreshRequest request) {
        try {
            String token = request.refreshToken();


            // Make sure this is actually a refresh token, not an access token
            if (!"refresh".equals(jwtUtil.extractType(token))) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }

            String username = jwtUtil.extractUsername(token);
            User user = userRepository.findByUsername(username).orElseThrow();

            if (!jwtUtil.isTokenValid(token, user)) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }

            // Issue a brand-new pair of tokens
            String newAccess = jwtUtil.generateAccessToken(user);
            String newRefresh = jwtUtil.generateRefreshToken(user);

            return ResponseEntity.ok(new AuthResponse(newAccess, newRefresh));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }
}
