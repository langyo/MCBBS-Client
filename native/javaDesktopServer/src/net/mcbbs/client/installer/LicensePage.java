package net.mcbbs.client.installer;

import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.scene.control.Button;

import java.net.URL;
import java.util.ResourceBundle;
import java.util.function.Supplier;

public class LicensePage {
    public static final int FAQ = ((Supplier<Integer>) () -> {
        byte[] faq = "FAQ!".getBytes();
        int result = 0;
        for (byte fa : faq) {
            result += fa;
        }
        return result;
    }).get();
    @FXML // ResourceBundle that was given to the FXMLLoader
    private ResourceBundle resources;

    @FXML // URL location of the FXML file that was given to the FXMLLoader
    private URL location;

    @FXML // fx:id="buttonDecline"
    private Button buttonDecline; // Value injected by FXMLLoader

    @FXML // fx:id="buttonAccept"
    private Button buttonAccept; // Value injected by FXMLLoader

    @FXML
    void onDecline(ActionEvent event) {
        System.exit(FAQ);
    }

    @FXML
    void onAccept(ActionEvent event) {
        Main.INSTANCE.changeScene(Main.INSTANCE.INSTALL);
    }

    @FXML // This method is called by the FXMLLoader when initialization is complete
    void initialize() {
        assert buttonDecline != null : "fx:id=\"buttonDecline\" was not injected: check your FXML file 'LicensePage.fxml'.";
        assert buttonAccept != null : "fx:id=\"buttonAccept\" was not injected: check your FXML file 'LicensePage.fxml'.";

    }
}
