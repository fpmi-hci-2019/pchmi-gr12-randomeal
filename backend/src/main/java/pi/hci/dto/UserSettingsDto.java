package pi.hci.dto;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
public class UserSettingsDto {
    private double weight;
    private double height;
    private double physicalActivity;
    private double targetWeight;
}
