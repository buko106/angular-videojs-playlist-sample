import videojs from 'video.js';
import Player from "video.js/dist/types/player";

const Component = videojs.getComponent('Component');

const style = `
width: 25%;
position: absolute;
top: 0;
right: 0;
z-index: 10;
`

class ServiceLogoComponent extends Component {

  constructor(player: Player, options = {}) {
    super(player, options);
  }

  override createEl() {
    return super.createEl('img', {}, {
      src: 'service-logo.png',
      style: style,
    });
  }
}

videojs.registerComponent('ServiceLogoComponent', ServiceLogoComponent);
