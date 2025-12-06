package com.cybertron;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import java.util.HashMap;
import java.util.Map;

@RestController
public class ChatController {

    @PostMapping("/api/chat")
    public Map<String, String> chat(@RequestBody Map<String, String> payload) {
        String userMessage = payload.get("message");
        Map<String, String> response = new HashMap<>();
        response.put("sender", "Cybertron");

        if (userMessage == null || userMessage.trim().isEmpty()) {
            response.put("message",
                    "I apologize, but I did not receive any input. Could you please state your inquiry again?");
            return response;
        }

        String lowerCaseMessage = userMessage.toLowerCase();
        String reply;

        if (lowerCaseMessage.contains("hello") || lowerCaseMessage.contains("hi") || lowerCaseMessage.contains("hey")) {
            reply = "Greetings, Operator. The Cybertron systems are fully operational and at your disposal.";
        } else if (lowerCaseMessage.contains("status") || lowerCaseMessage.contains("health")) {
            reply = "Diagnostic complete. All internal systems are functioning within optimal parameters. Backend connectivity is stable.";
        } else if (lowerCaseMessage.contains("deploy")) {
            reply = "Initiating deployment protocols. Please confirm when you are ready to proceed with the sequence.";
        } else if (lowerCaseMessage.contains("bye") || lowerCaseMessage.contains("exit")) {
            reply = "Acknowledged. Terminating session. Have a productive day, Operator.";
        } else {
            reply = "I have received your input: \"" + userMessage
                    + "\". However, I am currently programmed to respond to specific command protocols. Please refine your query.";
        }

        response.put("message", reply);
        return response;
    }
}
