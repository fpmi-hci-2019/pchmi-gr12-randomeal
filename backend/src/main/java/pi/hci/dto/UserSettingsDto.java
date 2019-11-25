package pi.hci.dto;

import lombok.Data;

@Data
public class UserSettingsDto {
    private double weight;
    private double height;
    private double physicalActivity;
    private double targetWeight;
}
