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
import javafx.scene.control.Label;
import javafx.scene.layout.HBox;

@Deprecated
public class ExitDialog {
    @FXML
    private Button cancelButton;

    @FXML
    private Label detailsLabel;

    @FXML
    private Button actionButton;

    @FXML
    private HBox actionParent;

    @FXML
    private Button okButton;

    @FXML
    private HBox okParent;

    @FXML
    private Label messageLabel;

    @FXML
    void onThink(ActionEvent event) {

    }

    @FXML
    void onCancel(ActionEvent event) {

    }

    @FXML
    void onConfirm(ActionEvent event) {

    }
}
