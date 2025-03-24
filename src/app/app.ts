import BaseComponent from "./components/base-component";
import { LoginPage } from "./views/login/login-page";
import { HeaderComponent } from "./components/header/header";
import { FooterComponent } from "./components/footer/footer";


export default class App {
  private readonly appContainer: BaseComponent;

  constructor() {
    this.appContainer = new BaseComponent({tagName: 'div', classNames: ['app']});
  }

  run() {
    const body = document.body;
    this.appContainer.appendToParent(body);

    // if (userData) {
    //   this.router.navigate('start-page')
    // } else {
    //   this.router.navigate('login-page')
    // }
    const header = new HeaderComponent();
    const login = new LoginPage();
    const footer = new FooterComponent();
    this.appContainer.append(header, login, footer);
  }
}




