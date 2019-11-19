package pi.hci.controller;

import pi.hci.service.TestService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("v1/test")
@RequiredArgsConstructor
@Slf4j
public class TestController {
    private final TestService testService;

    @RequestMapping(value = "/", method = RequestMethod.GET)
    public String test() {
        return testService.testMethod();
    }
}
