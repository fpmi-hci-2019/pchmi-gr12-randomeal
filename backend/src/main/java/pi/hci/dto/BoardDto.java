package pi.hci.dto;

import lombok.Data;
import lombok.experimental.Accessors;

import java.sql.Date;
import java.sql.Timestamp;

@Data
@Accessors(chain = true)
public class BoardDto {
    private int id;
    private String name;
    private Date createdAt;
    private Timestamp changedAt;
    private boolean isFavourite;
    private int userId;
}
