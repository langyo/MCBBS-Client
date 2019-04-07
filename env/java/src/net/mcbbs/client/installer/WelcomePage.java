package net.mcbbs.client.installer;

import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.scene.control.Button;

import java.net.URL;
import java.util.ResourceBundle;

/**
 * @author yinyangshi InitAuther97
 */
public class WelcomePage {
    @FXML // ResourceBundle that was given to the FXMLLoader
    private ResourceBundle resources;

    @FXML // URL location of the FXML file that was given to the FXMLLoader
    private URL location;

    @FXML // fx:id="buttonCancel"
    private Button buttonCancel; // Value injected by FXMLLoader

    @FXML // fx:id="buttonContinue"
    private Button buttonContinue; // Value injected by FXMLLoader

    @FXML
    void onCancel(ActionEvent event) {

    }

    @FXML
    void onContinue(ActionEvent event) {

    }

    @FXML // This method is called by the FXMLLoader when initialization is complete
    void initialize() {
        assert buttonCancel != null : "fx:id=\"buttonCancel\" was not injected: check your FXML file 'Untitled'.";
        assert buttonContinue != null : "fx:id=\"buttonContinue\" was not injected: check your FXML file 'Untitled'.";

    }
}
