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

Você também pode gerar ícones específicos da plataforma e tela de abertura colocando-os no diretório de resources/<plataforma>/ respectiva. Por exemplo, para gerar um ícone para o Android, coloque sua imagem em resource/android/icon.png .

Por padrão, este comando não irá regenerar recursos cuja imagem de origem não tenha sido alterada. Para desativar esta funcionalidade e sempre substituir as imagens geradas, use --force.

Para obter melhores resultados, a arte da tela inicial deve caber em um quadrado (1200 × 1200px) no centro da imagem. Você pode usar https://code.ionicframework.com/resources/splash.psd como um modelo para sua tela inicial e https://code.ionicframework.com/resources/icon.psd para o ícone que nesse PSD já estará no tamanho ideal para que funcione.

ionic resources atualizará automaticamente seu config.xml para refletir as mudanças nas imagens geradas, que Cordova configura.

# Sobre o Autor 
http://thinkam.net/think-academy
