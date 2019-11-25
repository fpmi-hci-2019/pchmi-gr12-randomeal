package pi.hci.dto;

import lombok.Data;
import lombok.experimental.Accessors;

import java.sql.Date;

@Data
@Accessors(chain = true)
public class BoardDto {
    private String name;
    private Date createdAt;
}
