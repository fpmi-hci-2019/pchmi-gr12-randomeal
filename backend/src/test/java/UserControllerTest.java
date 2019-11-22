import org.junit.Test;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

public class UserControllerTest extends AbstractTest {
    private final String USERS = "/v1/users/";

    @Test
    public void testGetAllUsers() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get(USERS))
                .andExpect(MockMvcResultMatchers.status().isOk());
    }

   /* @Test
    public void testCreateUser() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.post(USERS)
        .pa)
                .andExpect(MockMvcResultMatchers.status().isOk());
    }*/
}
