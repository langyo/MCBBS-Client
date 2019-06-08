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

/**
 * @author yinyangshi InitAuther97
 */
@Deprecated
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
