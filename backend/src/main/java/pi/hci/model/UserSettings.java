package pi.hci.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class UserSettings {
    private double weight;
    private double height;
    private double physicalActivity;
    private double targetWeight;
}
