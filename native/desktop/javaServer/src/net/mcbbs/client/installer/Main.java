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

import javafx.application.Application;
import javafx.fxml.FXMLLoader;
import javafx.scene.Scene;
import javafx.stage.Stage;

import java.io.IOException;
@Deprecated
public class Main extends Application {
    public static final Main INSTANCE = new Main();
    public final Scene INSTALL;
    public final Scene WELCOME;
    public final Scene EXIT_DIALOG;
    public final Scene LICENSE;
    public Stage PRIMARY_STAGE;

    public Main() {
        Scene VAR;
        try {
            VAR = new Scene(FXMLLoader.load(getClass().getResource("assets/mcbbsclient/installer/fxml/WelcomePage.fxml")), 600, 400);
        } catch (IOException e) {
            e.printStackTrace();
            VAR = null;
            System.exit(-1);
        }
        WELCOME = VAR;

        try {
            VAR = new Scene(FXMLLoader.load(getClass().getResource("assets/mcbbsclient/installer/fxml/ExitDialog.fxml")), 503, 102);
        } catch (IOException e) {
            VAR = null;
            e.printStackTrace();
            System.exit(-1);
        }
        EXIT_DIALOG = VAR;

        try {
            VAR = new Scene(FXMLLoader.load(getClass().getResource("assets/mcbbsclient/installer/fxml/LicensePage.fxml")), 600, 400);
        } catch (IOException e) {
            VAR = null;
            e.printStackTrace();
            System.exit(-1);
        }
        LICENSE = VAR;

        try {
            VAR = new Scene(FXMLLoader.load(getClass().getResource("assets/mcbbsclient/installer/fxml/InstallPage.fxml")), 600, 400);
        } catch (IOException e) {
            VAR = null;
            e.printStackTrace();
            System.exit(-1);
        }
        INSTALL = VAR;
    }

    /**
     * The main entry point for all JavaFX applications.
     * The start method is called after the init method has returned,
     * and after the system is ready for the application to begin running.
     *
     * <p>
     * NOTE: This method is called on the JavaFX Application Thread.
     * </p>
     *
     * @param primaryStage the primary stage for this application, onto which
     *                     the application scene can be set. The primary stage will be embedded in
     *                     the browser if the application was launched as an applet.
     *                     Applications may create other stages, if needed, but they will not be
     *                     primary stages and will not be embedded in the browser.
     */
    @Override
    public void start(Stage primaryStage) throws Exception {
        PRIMARY_STAGE = primaryStage;
        PRIMARY_STAGE.setScene(WELCOME);
        PRIMARY_STAGE.show();
    }

    public void changeScene(Scene scene) {
        PRIMARY_STAGE.close();
        PRIMARY_STAGE.setScene(scene);
        PRIMARY_STAGE.show();
    }
}
