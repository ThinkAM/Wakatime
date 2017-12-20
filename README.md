# Wakatime
Plataforma de contabilização e gerenciamento das horas reais de código

# Curso Básico de Programação Mobile
Cadastro Grátis: http://bit.ly/think-academy-cbpm

# Vídeos de Extensão do Curso
https://www.youtube.com/playlist?list=PLlK0hr3cSevV0m-JT-1CULSVS_nHIdZCt

# Bate papo sobre tecnologia II
Meetup: https://www.meetup.com/pt-BR/dev-pp/events/245829094/

# 1. Exemplo de otimização no tempo de geração dos icons e splash

# Ionic Resources
Criar automaticamente ícones e recursos de tela inicial com um só comando, e apenas um PSD criado para ícones e outro para splash. Fará com que encurte o tempo com esta atividade, pois será gerado a partir de uma matriz os arquivos necessários de todos os tamanhos requeridos.

# Comando
ionic resources [platform]

# Detalhes 
Ionic pode gerar automaticamente ícones de tamanho perfeito e telas de pré- visualização de imagens de origem (.png, .psd ou .ai) para suas plataformas Cordova.

A imagem de origem para ícones deve, idealmente, ser pelo menos 1024 × 1024px e localizada em resources/icon.png . A imagem de origem para tela inicial deve, idealmente, ser pelo menos 2732 × 2732px e localizada em resources/splash.png . Se você usou ionic start, já deve haver recursos do Ionic padrão nos resources/diretório, que você pode sobrescrever.

Você também pode gerar ícones específicos da plataforma e tela de abertura colocando-os no diretório de resources/[plataforma]/ respectiva. Por exemplo, para gerar um ícone para o Android, coloque sua imagem em resource/android/icon.png .

Por padrão, este comando não irá regenerar recursos cuja imagem de origem não tenha sido alterada. Para desativar esta funcionalidade e sempre substituir as imagens geradas, use --force.

Para obter melhores resultados, a arte da tela inicial deve caber em um quadrado (1200 × 1200px) no centro da imagem. Você pode usar https://code.ionicframework.com/resources/splash.psd como um modelo para sua tela inicial e https://code.ionicframework.com/resources/icon.psd para o ícone que nesse PSD já estará no tamanho ideal para que funcione.

ionic resources atualizará automaticamente seu config.xml para refletir as mudanças nas imagens geradas, que Cordova configura.

# 2. Criação de um componente integrado ao Wakatime
Integrar seu aplicativo a uma API já existente pode agilizar o processo de desenvolvimento e de aprendizado (caso esteja ainda aprendendo). No exemplo existe a integração com a API do Wakatime que é uma plataforma que gerencia as horas reais de código. 

<p>
- Passo 1 <br />
ionic g page project
</p>

<p>
- Passo 2 <br />
<code>
<ion-card>
  <ion-card-header>
    Projetos
  </ion-card-header>

 <ion-list>
    <button ion-item *ngFor="let project of projects">
      <ion-icon [id]="project.id" [name]="project.name" item-start></ion-icon>
      {{project.name}}
    </button>
 </ion-list>
</ion-card>
</code>
</p>

<p>
- Passo 3 <br />
Metodo em waka-service.ts que chama a API do Wakatime trazendo os projetos trabalhados pelo usuário que está logado <br />
<code>
  getProjectsCurrentUser(){
    return new Promise((resolve: any, reject: any) => {
        this.dbProvider.get("user").then((user: any) => {
        this.headers = new Headers({
          'Authorization': 'Basic ' + user.token
        });

        this.options = new RequestOptions({ headers: this.headers });

        this.http.get(this.baseApiUrl + "users/current/projects", this.options)
          .map(res => res.json())
          ._catch(error => reject(error.json()))
          .subscribe((res: any) => {
            resolve(res.data);
          });
      });    
    });
  }
</code>
</p>

<p>
- Passo 4 <br />
Chamada do método dentro do waka-service.ts <br />
<code>
import { Component } from '@angular/core';

import { WakaService } from '../../providers/waka-service';

...

projects: any[] = [];

  constructor(private wakaService: WakaService) {
    this.wakaService.getProjectsCurrentUser().then((projects: any[]) => {  
      console.log(projects);  
      this.projects = projects;
    })
  }
</code>
</p>

<p>
- Passo 5 <br />
Acrescentar o módulo em app.modules.ts: <br />
<code>
    import { ProjectPage } from '../pages/project/project';

    ...

declarations: [
    MyApp,
    HomePage,
    ProjectPage,

    ...

  entryComponents: [
    MyApp,
    HomePage,
    ProjectPage    

    ...
</code>
</p>

<p>
- Passo 6 <br />
Acrescentar a ação click no componente da home, no card home.html e na function em home.ts <br />

HTML <br />
<code>
...

  <ion-card (click)="project()">
...
</code>

TS <br />
<code>
import { ProjectPage } from '../project/project';
...

  public project() {
    this.nav.push(ProjectPage);
  }
</code>
</p>

Para executar o teste temos que rodar em um emulador ou no nosso próprio aparelho, porque quando rodamos pelo browser o Wakatime recusa nossas requisições por questões de segurança.

# 3. Atualização na Play Store
Sempre que vamos atualizar nosso aplicativo na Play Store precisamos alterar a versão do aplicativo no config.xml, é importante lembrar de utilizar a mesma keystore de quando geramos a APK pela primeira vez, são detalhes e cuidados que devemos cuidar na hora de dar manutenção em um aplicativo.

Segundo o Semantic Versioning:

- O primeiro número indica que o sistema tem mudanças que o torna incompatível com versões anteriores;
- O segundo número indica que o sistema tem mudanças compatíveis com versões anteriores, dentro do primeiro número;
- O terceiro número indica que o sistema tem mudanças menores, como correções de bugs e funcionalidades que não prejudicam a compatibilidade com versões anteriores.

Opcionalmente, define-se um quarto número, chamado de release. Indica o número atual do build daquele código, dentro de um escopo de modificações.

# Geração da Release
<p>
- Passo 1 <br />
ionic build android
</p>
<p>
- Passo 2 <br /> 
cordova build --release android
</p>
<p>
- Passo 3 <br />
Entrar na bin do JDK do Java: <br />
Exemplo do meu mac: /Library/Java/JavaVirtualMachines/1.8.0.jdk/Contents/Home <br />
Exemplo do meu windows: C:\Program Files (x86)\Java\jdk1.8.0_131\bin <br />

cd "%JAVA_HOME%\bin" (Windows) <br />
cd “$JAVA_HOME/bin” (Mac/Linux)<br />
Substitua a variável pelo caminho exemplo: cd C:\Program Files (x86)\Java\jdk1.8.0_131\bin
</p>

<p>
- Passo 4 <br />
Gerar keystore (Só gerar quando for subir a primeira vez na Playstore, depois você usará essa mesma chave para subir uma atualização)
</p>

<p>
- Passo 5 <br />
Execute a ferramenta jarsigner que está inclusa na JDK
</p>

<p> Windows <br />
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore think.keystore "%APP_DIR%\platforms\android\build\outputs\apk\android-release-unsigned.apk" testapp-key 
</p>

<p> MAC/Linux <br />
sudo jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore think.keystore $APP_DIR/platforms/android/build/outputs/apk/android-release-unsigned.apk testapp-key<br />
<br />
Troque a variável APP_DIR pelo diretório do seu app, exemplo: <br />
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore think.keystore "C:\ThinkAcademy\github\Wakatime\ThinkAMWakatime\platforms\android\build\outputs\apk\android-release-unsigned.apk" testapp-key<br />

<p>
- Passo 6 <br />
Entrar na pasta de build do Android: <br />
Windows <br />
cd "%ANDROID_HOME%\build-tools\x.x.x"<br />
<br />
MAC/Linux<br />
cd $ANDROID_HOME/build-tools/x.x.x<br />
<br />

Troque a variável ANDROID_HOME pelo diretório do seu app, exemplo: <br />
cd C:\Program Files (x86)\Android\android-sdk\build-tools\25.0.3<br />

<p>
- Passo 7 <br />
Gerar o pacote final:<br />
Windows <br />
.\zipalign -v 4 "%APP_DIR%\platforms\android\build\outputs\apk\android-release-unsigned.apk" "%APP_DIR%\platforms\android\build\outputs\apk\think-x.x.x.apk"<br />
<br />
Mac/Linux sudo <br />
/zipalign -v 4 $APP_DIR/platforms/android/build/outputs/apk/android-release-unsigned.apk $APP_DIR/platforms/android/build/outputs/apk/think-x.x.x.apk<br />
<br />
Troque a variável APP_DIR pelo diretório do seu app, exemplo: <br />
.\zipalign -v 4 “C:\ThinkAcademy\github\Wakatime\ThinkAMWakatime\platforms\android\build\outputs\apk\android-release-unsigned.apk” “C:\ThinkAcademy\github\Wakatime\ThinkAMWakatime\platforms\android\build\outputs\apk\think-0.0.2.apk”<br />
<br />
 </p>

# Slide da Apresentação no Meetup de Bate papo sobre tecnologia II
https://pt.slideshare.net/falbuquerquedealmeida/bate-papo-sobre-tecnologia-ii

# Sobre o Autor 
http://thinkam.net/think-academy
