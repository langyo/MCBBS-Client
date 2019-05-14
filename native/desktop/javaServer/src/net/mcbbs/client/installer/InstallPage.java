/*
   Copyright 2019 langyo<langyo.china@gmail.com> and contributors

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
 */

package net.mcbbs.client.installer;

import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.scene.control.Button;

import java.net.URL;
import java.util.ResourceBundle;
@Deprecated
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

    @FXML
        // This method is called by the FXMLLoader when initialization is complete
    void initialize() {
        assert buttonChooseLoc != null : "fx:id=\"buttonChooseLoc\" was not injected: check your FXML file 'InstallPage.fxml'.";
        assert buttonInstall != null : "fx:id=\"buttonInstall\" was not injected: check your FXML file 'InstallPage.fxml'.";

    }
}
