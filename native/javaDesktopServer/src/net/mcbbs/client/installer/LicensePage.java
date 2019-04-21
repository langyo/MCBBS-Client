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
    /**
     * ResourceBundle that was given to the FXMLLoader
     */
    @FXML
    private ResourceBundle resources;

    /**
     * URL location of the FXML file that was given to the FXMLLoader
     */
    @FXML
    private URL location;

    /**
     * fx:id="button`Decline"
     * Value injected by FXMLLoader
     */
    @FXML
    private Button buttonDecline;

    /**
     * fx:id="buttonAccept"
     * Value injected by FXMLLoader
     */
    @FXML
    private Button buttonAccept;

    @FXML
    void onDecline(ActionEvent event) {
        System.exit(FAQ);
    }

    @FXML
    void onAccept(ActionEvent event) {
        Main.INSTANCE.changeScene(Main.INSTANCE.INSTALL);
    }

    /**
     * This method is called by the FXMLLoader when initialization is complete
     */
    @FXML
    void initialize() {
        assert buttonDecline != null : "fx:id=\"buttonDecline\" was not injected: check your FXML file 'LicensePage.fxml'.";
        assert buttonAccept != null : "fx:id=\"buttonAccept\" was not injected: check your FXML file 'LicensePage.fxml'.";

    }
}
