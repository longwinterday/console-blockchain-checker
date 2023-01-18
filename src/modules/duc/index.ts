import Messages from "../../libs/messages";
import IMenu from "../../interfaces/menu";
import Send from "./send";

export default abstract class Duc {
  public static menuList: IMenu[] = [
    {
      name: "Send duc.",
      annotation: "",
      module: Send,
    },
  ];

  public static init() {
    const menuListNumber: string = Messages.renderMenuList({
      title: "Duc: ",
      list: Duc.menuList,
    });
    const menuListIndex = Number(menuListNumber) - 1;

    if (menuListIndex < 0 && menuListIndex > Duc.menuList.length - 1) {
      this.init();
      return 0;
    }

    const module = Duc.menuList[menuListIndex].module;

    module.init();
  }
}
