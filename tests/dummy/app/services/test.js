import Service from '@ember/service';

export default class TestService extends Service {
  getText() {
    return 'Hello from Test Service';
  }
}
