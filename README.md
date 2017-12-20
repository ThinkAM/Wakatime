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

Para executar o teste temos que rodar em um emulador ou no nosso próprio aparelho, porque quando rodamos pelo browser o Wakatime recusa nossas requisições por questões de segurança.

# 3. Atualização na Play Store
Sempre que vamos atualizar nosso aplicativo na Play Store precisamos alterar a versão do aplicativo no config.xml, é importante lembrar de utilizar a mesma keystore de quando geramos a APK pela primeira vez, são detalhes e cuidados que devemos cuidar na hora de dar manutenção em um aplicativo.

Segundo o Semantic Versioning:

- O primeiro número indica que o sistema tem mudanças que o torna incompatível com versões anteriores;
- O segundo número indica que o sistema tem mudanças compatíveis com versões anteriores, dentro do primeiro número;
- O terceiro número indica que o sistema tem mudanças menores, como correções de bugs e funcionalidades que não prejudicam a compatibilidade com versões anteriores.

Opcionalmente, define-se um quarto número, chamado de release. Indica o número atual do build daquele código, dentro de um escopo de modificações.

# Geração da Release

- Passo 1
ionic build android

- Passo 2 
cordova build --release android

- Passo 3
* Entrar na bin do JDK do Java:
- Exemplo do meu mac: /Library/Java/JavaVirtualMachines/1.8.0.jdk/Contents/Home 
- Exemplo do meu windows: C:\Program Files (x86)\Java\jdk1.8.0_131\bin

cd "%JAVA_HOME%\bin" (Windows)
cd “$JAVA_HOME/bin” (Mac/Linux)
- Substitua a variável pelo caminho exemplo: cd C:\Program Files (x86)\Java\jdk1.8.0_131\bin

- Passo 4
Gerar keystore (Só gerar quando for subir a primeira vez na Playstore, depois você usará essa mesma chave para subir uma atualização)

- Passo 5
Execute a ferramenta jarsigner que está inclusa na JDK

* Windows 
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore think.keystore "%APP_DIR%\platforms\android\build\outputs\apk\android-release-unsigned.apk" testapp-key

* MAC/Linux 
sudo jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore think.keystore $APP_DIR/platforms/android/build/outputs/apk/android-release-unsigned.apk testapp-key

- Troque a variável APP_DIR pelo diretório do seu app, exemplo: 
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore think.keystore "C:\ThinkAcademy\github\Wakatime\ThinkAMWakatime\platforms\android\build\outputs\apk\android-release-unsigned.apk" testapp-key

- Passo 6 
Entrar na pasta de build do Android:
* Windows
cd "%ANDROID_HOME%\build-tools\x.x.x"

* MAC/Linux
cd $ANDROID_HOME/build-tools/x.x.x


* Troque a variável ANDROID_HOME pelo diretório do seu app, exemplo: 
cd C:\Program Files (x86)\Android\android-sdk\build-tools\25.0.3

- Passo 7 
Gerar o pacote final:
* Windows 
.\zipalign -v 4 "%APP_DIR%\platforms\android\build\outputs\apk\android-release-unsigned.apk" "%APP_DIR%\platforms\android\build\outputs\apk\think-x.x.x.apk"

* Mac/Linux sudo 
./zipalign -v 4 $APP_DIR/platforms/android/build/outputs/apk/android-release-unsigned.apk $APP_DIR/platforms/android/build/outputs/apk/think-x.x.x.apk

- Troque a variável APP_DIR pelo diretório do seu app, exemplo: 
.\zipalign -v 4 “C:\ThinkAcademy\github\Wakatime\ThinkAMWakatime\platforms\android\build\outputs\apk\android-release-unsigned.apk” “C:\ThinkAcademy\github\Wakatime\ThinkAMWakatime\platforms\android\build\outputs\apk\think-0.0.2.apk”

# Slide da Apresentação no Meetup de Bate papo sobre tecnologia II
https://pt.slideshare.net/falbuquerquedealmeida/bate-papo-sobre-tecnologia-ii

# Sobre o Autor 
http://thinkam.net/think-academy
