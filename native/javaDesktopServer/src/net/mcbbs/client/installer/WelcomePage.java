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

    @FXML
    private ResourceBundle resources;

    @FXML
    private URL location;
    /**
     * fx:id="buttonCancel"
     * Value injected by FXMLLoader
     */
    @FXML
    private Button buttonCancel;
    /**
     * fx:id="buttonContinue"
     * Value injected by FXMLLoader
     */
    @FXML
    private Button buttonContinue;

    @FXML
    void onCancel(ActionEvent event) {

    }

    @FXML
    void onContinue(ActionEvent event) {

    }

    /**
     * This method is called by the FXMLLoader when initialization is complete
     */
    @FXML
    void initialize() {
        assert buttonCancel != null : "fx:id=\"buttonCancel\" was not injected: check your FXML file 'Untitled'.";
        assert buttonContinue != null : "fx:id=\"buttonContinue\" was not injected: check your FXML file 'Untitled'.";
    }
}
