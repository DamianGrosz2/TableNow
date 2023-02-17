package coolsten.reservation.pingus;

import coolsten.reservation.pingus.rest.RestaurantResource;
import coolsten.reservation.pingus.service.RestaurantService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.junit.jupiter.api.Assertions.assertEquals;


@SpringBootTest
@AutoConfigureMockMvc
public class ReservationServerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    public void testPingPong() throws Exception {
        RequestBuilder requestBuilder = MockMvcRequestBuilders.get("/ping/");
        String result = mockMvc.perform(requestBuilder).andReturn().getResponse().getContentAsString();
        assertEquals("pong", result);
    }


}
