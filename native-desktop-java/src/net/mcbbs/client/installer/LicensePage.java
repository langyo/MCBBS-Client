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
import java.util.function.Supplier;

@Deprecated
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
