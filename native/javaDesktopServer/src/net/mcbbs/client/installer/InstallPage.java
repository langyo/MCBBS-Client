package net.mcbbs.client.installer;

import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.scene.control.Button;

import java.net.URL;
import java.util.ResourceBundle;

public class InstallPage {
    @FXML // ResourceBundle that was given to the FXMLLoader
    private ResourceBundle resources;

    @FXML // URL location of the FXML file that was given to the FXMLLoader
    private URL location;

    @FXML // fx:id="buttonChooseLoc"
    private Button buttonChooseLoc; // Value injected by FXMLLoader

    @FXML // fx:id="buttonInstall"
    private Button buttonInstall; // Value injected by FXMLLoader

    @FXML
    void onLocChoose(ActionEvent event) {

    }

    @FXML
    void onInstall(ActionEvent event) {

    }

    @FXML // This method is called by the FXMLLoader when initialization is complete
    void initialize() {
        assert buttonChooseLoc != null : "fx:id=\"buttonChooseLoc\" was not injected: check your FXML file 'InstallPage.fxml'.";
        assert buttonInstall != null : "fx:id=\"buttonInstall\" was not injected: check your FXML file 'InstallPage.fxml'.";

    }
}
