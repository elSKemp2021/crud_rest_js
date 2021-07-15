package webapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import webapp.service.UserService;
import java.security.Principal;

@Controller
@RequestMapping("/admin")
public class AdminController {

    private  UserService userService;

    @Autowired
    public AdminController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public String getAllUsers(Model model, Principal principal) {
        model.addAttribute("activeUser", userService.getUserByUsername(principal.getName()));
        return "admin/admin";
    }
}