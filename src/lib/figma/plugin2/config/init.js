const PREFIX = 'figma_';
const CLASS_PREFIX = 'Figma';
const BASE_URL = 'https://api.figma.com';
//DIRECTORY
const SHARED_DIR = PREFIX + 'design';
const FILES_DIR = PREFIX + 'files';
const COMPONENTS_DIR = PREFIX + 'components';
const STATIC_DIR = 'static';
const IMAGES_DIR = 'images';
//PATHS
const SHARED_PATH = `./src/${SHARED_DIR}`; //'./src/figma_design'
const FILES_PATH = `${SHARED_PATH}/${FILES_DIR}`; // './src/figma_design/figma_files'
const COMPONENTS_PATH = `${SHARED_PATH}/${COMPONENTS_DIR}`; // './src/figma_design/figma_components'
const IMAGES_PATH = `${SHARED_PATH}/${STATIC_DIR}/${IMAGES_DIR}`; // './src/figma_design/static/images'
//SPECIAL CHARACTERS
const SEPARATE_ELEMENT_NAME = '??'; // разделяет строку с названием элемента и его эффектами находящтеся в имени данного елемента 
const EFFECT_SEPARATOR = '&'; // разделяет каждый эффект находящтеся в имени данного елемента
//TYPES
const ALL_TYPES = ['DOCUMENT', 'CANVAS', 'FRAME', 'GROUP', 'VECTOR', 'BOOLEAN', 'STAR', 'LINE', 'ELLIPSE', 'REGULAR_POLYGON', 'RECTANGLE', 'TEXT', 'SLICE', 'COMPONENT', 'INSTANCE'];
const ELEMENT_TYPES = ['DOCUMENT', 'CANVAS', 'FRAME','TEXT', 'SLICE', 'COMPONENT', 'INSTANCE'];
const SHAPE_TYPES = ['DOCUMENT', 'CANVAS', 'FRAME', 'COMPONENT', 'INSTANCE', 'BOOLEAN'];
const VECTOR_TYPES = ['VECTOR', 'LINE', 'REGULAR_POLYGON', 'ELLIPSE', 'STAR'];
const GROUP_TYPES = ['GROUP', 'BOOLEAN_OPERATION'];
//NODE TYPES
const NODE_TYPE = [
  "DOCUMENT" ,
  "PAGE" ,
  "SLICE" ,
  "FRAME" ,
  "GROUP" ,
  "COMPONENT" ,
  "INSTANCE" ,
  "BOOLEAN_OPERATION" ,
  "VECTOR" ,
  "STAR" ,
  "LINE" ,
  "ELLIPSE" ,
  "POLYGON" ,
  "RECTANGLE" ,
  "TEXT"
]
//BLEND MODE
const BLEND_MODE = [
  "PASS_THROUGH", 
  "NORMAL", 
  "DARKEN", 
  "MULTIPLY", 
  "LINEAR_BURN", 
  "COLOR_BURN", 
  "LIGHTEN", 
  "SCREEN", 
  "LINEAR_DODGE", 
  "COLOR_DODGE", 
  "OVERLAY", 
  "SOFT_LIGHT",
  "HARD_LIGHT",
  "DIFFERENCE",
  "EXCLUSION",
  "HUE",
  "SATURATION",
  "COLOR",
  "LUMINOSITY"
]

const BASE_NODE = [
  'DocumentNode',
  'PageNode',
  'SceneNode'
]

const SCENE_NODE = [
  'SliceNode',
  'FrameNode',
  'GroupNode',
  'ComponentNode',
  'InstanceNode',
  'BooleanOperationNode',
  'VectorNode',
  'StarNode',
  'LineNode',
  'EllipseNode',
  'PolygonNode',
  'RectangleNode',
  'TextNode'
]

//STYLE PROPERTIES
const STYLE_PROPERTIES = {
    //TEXT
    textTransform: 'text-transform', // text-transform - преобразование текста  
    whiteSpace: 'white-space', // white-space - обработка пробелов между словами
    tabsize: 'tab-size', // tab-size - настройка табуляции
    wordBreak: 'word-break', // word-break - перенос длинных слов в строках
    lineBreak: 'line-break', // line-break - разрыв строки
    hyphens: 'hyphens', // hyphens - расстановка переносов
    overflowWrap: 'overflow-wrap', // overflow-wrap - переполнение блока-обертки
    wordWrap: 'word-wrap', // word-wrap - переполнение блока-обертки
    textAlign: 'text-align', // text-align - выравнивание текста
    textAlignAll: 'text-align-all', // text-align-all - выравнивание текста по умолчанию
    textAlignLast: 'text-align-last', // text-align-last - выравнивание последней строки
    wordSpacing: 'word-spacing', // word-spacing - промежутки между словами
    letterSpacing: 'letter-spacing', // letter-spacing - трекинг
    textIndent: 'text-indent', // text-indent - отступ первой строки
    //TEXT DECORATION
    textDecorationLine: 'text-decoration-line', // text-decoration-line - вид линии оформления
    textDecorationStyle: 'text-decoration-style', // text-decoration-style - стиль линии оформления
    textDecorationColor: 'text-decoration-color', // text-decoration-color - цвет линии оформления
    textDecoration: 'text-decoration', // text-decoration - краткая запись свойств линии оформления
    textUnderlinePosition: 'text-underline-position', // text-underline-position - расположение линии оформления
    textShadow: 'text-shadow', // text-shadow - тень текста
    //FONTS
    fontFamily: 'font-family', // font-family - семейство шрифтов
    fontWeight: 'font-weight', // font-weight - насыщенность шрифта
    fontStretch: 'font-stretch', // font-stretch - ширина шрифта
    fontStyle: 'font-style', // font-style - стиль начертания шрифта
    fontSize: 'font-size', // font-size - размер шрифта
    fontSizeAdjust: 'font-size-adjust', // font-size-adjust - относительный размер шрифта
    font: 'font', // font - краткая запись свойств шрифта
    fontSynthesis: 'font-synthesis', // font-synthesis - управление синтезом шрифтов
    fontFeatureSettings: 'font-feature-settings', // font-feature-settings - низкоуровневое управление настройками шрифтов
    fontKerning: 'font-kerning', // font-kerning - кернинг
    fontVariant: 'font-variant', // font-variant - общее сокращение для рендеринга шрифтов
    fontVariantCaps: 'font-variant-caps', // font-variant-caps - преобразование в заглавные буквы
    fontVariantEastAsian: 'font-variant-east-asian', // font-variant-east-asian - визуализация восточноазиатского текста
    fontVariantLigatures: 'font-variant-ligatures', // font-variant-ligatures - лигатуры
    fontVariantNumeric: 'font-variant-numeric', // font-variant-numeric - форматирование цифр
    fontVariantPosition: 'font-variant-position', // font-variant-position - подстрочные и надстрочные формы
    //TABLES
    borderCollapse: 'border-collapse', // border-collapse - удаление промежутка между рамками ячеек
    borderSpacing: 'border-spacing', // border-spacing - увеличение промежутка между рамками ячеек
    captionSide: 'caption-side', // caption-side - управление местоположением подписи к таблице
    emptyCells: 'empty-cells', // empty-cells - скрытие пустых ячеек
    tableLayout: 'table-layout', // table-layout - компоновка макета таблицы
    //LISTS
    listStyle: 'list-style',  // list-style - краткая форма задания стилей списка
    listStyleType: 'list-style-type',  // list-style-type - тип маркера списка
    listStyleImage: 'list-style-image',  // list-style-image - маркер-изображение для элементов списка
    listStylePosition: 'list-style-position',  // list-style-position - местоположение маркера списка
    //BLOCK MODEL
    display: 'display', //display - тип генерируемого элементом контейнера
    height: 'height', //height - высота элемента
    maxHeight: 'max-height', //max-height - максимальная высота
    minHeight: 'min-height', //min-height - минимальная высота
    width: 'width', //width - ширина элемента
    maxWidth: 'max-width', //max-width - максимальная ширина
    minWidth: 'min-width', //min-width - минимальная ширина
    margin: 'margin ', //margin - внешний отступ между рамкой элемента и другими элементами
    marginBottom: 'margin-bottom', //margin-bottom - внешний отступ снизу
    marginLeft: 'margin-left',//margin-left - внешний отступ слева
    marginRight: 'margin-right', //margin-right - внешний отступ справа
    marginTop: 'margin-top', //margin-top - внешний отступ сверху
    padding: 'padding', //padding - внутренний отступ между содержимым и рамкой элемента
    paddingBottom: 'padding-bottom', //padding-bottom - внутренний отступ снизу
    paddingLeft: 'padding-left', //padding-left - внутренний отступ слева
    paddingRight: 'padding-right', //padding-right - внутренний отступ справа
    paddingTop: 'padding-top', //padding-top - внутренний отступ сверху
    boxSizing: 'box-sizing', //box-sizing - управление расчётом ширины и высоты элемента с учётом внутренних отступов и толщины рамки
    verticalAlign: 'vertical-align', //vertical-align - вертикальное позиционирование
    lineHeight: 'line-height', //line-height - высота строки
    //POSITIONING AND FLOW
    position: 'position', //position - управление положением элементов
    bottom: 'bottom', //bottom - смещение относительно нижней стороны блока-контейнера
    left: 'left', //left - смещение относительно левой стороны блока-контейнера
    right: 'right', //right - смещение относительно правой стороны блока-контейнера
    top: 'top', //top - смещение относительно верхней стороны блока-контейнера
    float: 'float', //float - перемещение элементов с выравниванием по левому или правому краю блока-контейнера
    clear: 'clear', //clear - отмена обтекания с одной или обоих сторон элемента
    zIndex: 'z-index', //z-index - наложение элементов
    objectFit: 'object-fit ',//object-fit - управляет заполнением контейнера для содержимого замещаемых элементов
    objectPosition: 'object-position', //object-position - позиционирует содержимое замещаемых элементов внутри контейнера относительно осей X и Y
    //PRUNING
    textOverflow: 'text-overflow', // text-overflow - обрезка строк
    clip: 'clip', // clip - обрезка части элемента
    overflow: 'overflow', //overflow - добавление полос прокрутки или скрытие содержимого
    overflowX: 'overflow-x', //overflow-x - обрезка правого края контента внутри блока в случае его переполнения
    overflowY: 'overflow-y', //overflow-y - обрезка нижнего края контента внутри блока в случае его переполнения
    //ELEMENT VISIBILITY
    opacity: 'opacity', //opacity - прозрачность элемента
    visibility: 'visibility', //visibility - управление видимостью элемента
    //BACKGROUND
    background: 'background', //background - задание фона элемента одним свойством
    backgroundColor: 'background-color', //background-color - цвет фона
    backgroundImage: 'background-image', //background-image - фоновое изображение
    backgroundPosition: 'background-position', //background-position - положение фонового изображения
    backgroundRepeat: 'background-repeat', //background-repeat - повтор фонового изображения
    backgroundSize: 'background-size', //background-size - размер фонового изображения
    backgroundAttachment: 'background-attachment', //background-attachment - фиксация фонового изображения на месте
    backgroundClip: 'background-clip', //background-clip - заполнение фоном отступов и границ элемента
    backgroundOrigin: 'background-origin', //background-origin - положение фонового изображения относительно его родительского блока
    backgroundBlendMode: 'background_blend_mode',//background_blend_mode режим смешивания фоновых слоёв, заданных в свойстве background-image //background-blend-mode - режим смешивания фоновых слоёв, заданных в свойстве background-image
    //BORDER
    border: 'border', //border - задание рамки элемента одним свойством
    borderWidth: 'border-width', //border-width - толщина рамки
    borderStyle: 'border-style', //border-style - стиль рамки
    borderColor: 'border-color', //border-color - цвет рамки
    borderBottom: 'border-bottom', //border-bottom - задание нижней рамки одним свойством
    borderBottomWidth: 'border-bottom-width', //border-bottom-width - ширина нижней рамки
    borderBottomStyle: 'border-bottom-style', //border-bottom-style - стиль нижней рамки
    borderBottomColor: 'border-bottom-color', //border-bottom-color - цвет нижней рамки
    borderLeft: 'border-left',//border-left - задание левой рамки одним свойством
    borderLeftWidth: 'border-left-width', //border-left-width - толщина левой рамки
    borderLeftStyle: 'border-left-style', //border-left-style - стиль левой рамки
    borderLeftColor: 'border-left-color', //border-left-color - цвет левой рамки
    borderTop: 'border-top', //border-top - задание верхней рамки одним свойством
    borderTopWidth: 'border-top-width', //border-top-width - толщина верхней рамки
    borderTopStyle: 'border-top-style', //border-top-style - стиль верхней рамки
    borderTopColor: 'border-top-color', //border-top-color - цвет верхней рамки
    borderRight: 'border-right', //border-right - задание правой рамки одним свойством
    borderRightWidth: 'border-right-width', //border-right-width - толщина правой рамки
    borderRightStyle: 'border-right-style', //border-right-style - стиль правой рамки
    borderRightColor: 'border-right-color',//border-right-color - цвет правой рамки
    borderRadius: 'border-radius',//border-radius - задание радиуса скругления углов рамки одним свойством
    borderTopLeftRadius: 'border-top-left-radius', //border-top-left-radius - верхний левый радиус
    borderTopRightRadius: 'border-top-right-radius', //border-top-right-radius - верхний правый радиус
    borderBottomLeftRadius: 'border-bottom-left-radius', //border-bottom-left-radius - нижний левый радиус
    borderBottomRightRadius: 'border-bottom-right-radius', //border-bottom-right-radius - нижний правый радиус
    borderImage: 'border-image', //border-image - задание рамки-изображения одним свойством
    borderImageOutset: 'border-image-outset', //border-image-outset - смещение рамки-изображения
    borderImageRepeat: 'border-image-repeat', //border-image-repeat - повтор рамки-изображения
    borderImageSlice: 'border-image-slice', //border-image-slice - размер частей рамки-изображения
    borderImageSource: 'border-image-source', //border-image-source - источник рамки-изображения
    borderImageWidth: 'border-image-width', //border-image-width - толщина рамки-изображения
    //GENERATED CONTENT
    content: 'content', //content - добавление генерируемого содержимого
    counterincrement: 'counter-increment', //counter-increment - приращение счётчика
    counterReset: 'counter-reset', //counter-reset - имя счётчика
    quotes: 'quotes', //quotes - добавление кавычек заданного типа
    //SHADOW
    boxShadow: 'box-shadow', //box-shadow - тень блока
    //TRANSITIONS
    transition: 'transition', //transition - краткая запись перехода
    transitionDelay: 'transition-delay', //transition-delay - задержка перехода
    transitionDuration: 'transition-duration', //transition-duration - продолжительность перехода
    transitionProperty: 'transition-property', //transition-property - название свойств, к которым будет применен перехода
    transitionTimingFunction: 'transition-timing-function',  //transition-timing-function - функция перехода
    //TRANSFORMATIONS
    backfaceVisibility: 'backface-visibility', //backface-visibility - видимость обратной стороны элемента
    perspective: 'perspective', //perspective - активация 3D-пространства для элемента
    perspectiveOrigin: 'perspective-origin', //perspective-origin - точка 3D-трансформации
    transform: 'transform', //transform - функция 2D-трансформации
    transformOrigin: 'transform-origin', //transform-origin - точка 2D-трансформации
    transformStyle: 'transform-style', //transform-style - стиль 3D-преобразований
    //ANIMATION
    animation: 'animation', //animation - краткая запись всех свойств анимации
    animationName: 'animation-name', //animation-name - название анимации
    animationDuration: 'animation-duration', //animation-duration - длительность анимации
    animationDelay: 'animation-delay', //animation-delay - задержка анимации
    animationDirection: 'animation-direction', //animation-direction - направление повтора анимации
    animationFillMode: 'animation-fill-mode', //animation-fill-mode - состояние элемента до и после воспроизведения анимации
    animationIterationCount: 'animation-iteration-count', //animation-iteration-count - число повторов анимации
    animationPlayState: 'animation-play-state', //animation-play-state - остановка анимации
    animationTimingFunction: 'animation-timing-function', //animation-timing-function - функция изменения скорости анимации во времени
    //FLEXBOX
    flex: 'flex',// flex - задание базовой ширины и трансформации элемента одним свойством
    flexBasis: 'flex-basis', // flex-basis - базовая ширина элемента
    flexGrow: 'flex-grow',  // flex-grow - коэффициент увеличения ширины flex-элемента
    flexShrink: 'flex-shrink ', // flex-shrink - коэффициент уменьшения ширины flex-элемента
    flexFlow: 'flex-flow', // flex-flow - краткая запись направления и многострочности
    flexDirection: 'flex-direction', // flex-direction - направление главной оси flex-контейнера
    flexWrap: 'flex-wrap', // flex-wrap - многострочность элементов
    alignContent: 'align-content', // align-content - многострочное выравнивание
    alignItems: 'align-items', // align-items - выравнивание элементов по вертикали
    alignSelf: 'align-self', // align-self - выравнивание отдельных элементов
    order: 'order', // order - порядок отображения элементов
    justifyContent: 'justify-content', // justify-content - выравнивание элементов по горизонтали
    //SPEAKERS
    columnRule: 'column-rule ', //column-rule - краткая запись стилей разделительной линии
    columnRuleWidth: 'column-rule-width', //column-rule-width - толщина разделительной линии
    columnRuleStyle: 'column-rule-style', //column-rule-style - тип разделительной линии
    columnRuleColor: 'column-rule-color', //column-rule-color - цвет разделительной линии
    columns: 'columns', //columns - задание колонок с помощью одного свойства
    columnCount: 'column-count', //column-count - количество колонок
    columnWidth: 'column-width', //column-width - ширина колонок
    columnGap: 'column-gap', //column-gap - ширина пустого пространства между колонками
    columnSpan: 'column-span', //column-span - позиционирование элемента на несколько колонок
    columnFill:'column-fill', //column-fill - заполнение колонок содержимым
    //PRINTING DOCUMENTS
    pageBreakAfter: 'page-break-after', //page-break-after - наличие или отсутствие разрыва страницы после выбранного элемента
    pageBreakBefore: 'page-break-before', //page-break-before - наличие или отсутствие разрыва страницы перед выбранным элементом
    pageBreakInside: 'page-break-inside', //page-break-inside - наличие или отсутствие разрыва страницы внутри выбранного элемента
    //GRID
    gap: 'gap', //gap - сокращенная запись промежутков между элементами сетки
    grid: 'grid', //grid - краткая запись сетки
    gridArea: 'grid-area', //grid-area - сокращенная запись свойств размещения с помощью линий сетки
    gridAutoColumns: 'grid-auto-columns', //grid-auto-columns - установка размера автоматических столбцов сетки
    gridAutoFlow: 'grid-auto-flow',//grid-auto-flow - автоматическое размещение элементов сетки
    gridAutoRows: 'grid-auto-rows',//grid-auto-rows - установка размера неявных строк сетки
    gridColumn: 'grid-column', //grid-column - краткая запись свойств размещения элементов сетки в столбце
    gridColumnEnd: 'grid-column-end', //grid-column-end - конечная линия столбца
    columnGap: 'column-gap', //column-gap - промежутки между столбцами сетки
    gridColumnStart: 'grid-column-start',//grid-column-start - начальная линия столбца
    gridRow: 'grid-row', //grid-row - краткая запись свойств размещения элементов сетки в строке
    gridRowEnd: 'grid-row-end',//grid-row-end - конечная линия строки
    rowGap: 'row-gap', //row-gap - промежутки между строками сетки
    gridRowStart: 'grid-row-start',//grid-row-start - начальная линия строки
    gridTemplate: 'grid-template',//grid-template - краткая запись явной сетки
    gridTemplateAreas: 'grid-template-areas',//grid-template-areas - задание именованных областей сетки
    gridTemplateColumns: 'grid-template-columns',//grid-template-columns - задание столбцов сетки
    gridTemplateRows: 'grid-template-rows',//grid-template-rows - задание строк сетки
    //USER INTERFACE
    outline: 'outline', //outline - задание внешнего контура одним свойством
    outlineColor: 'outline-color', //outline-color - цвет внешнего контура
    outlineOffset: 'outline-offset', //outline-offset - смещение внешнего контура
    outlineStyle: 'outline-style', //outline-style - стиль линии внешнего контура
    outlineWidth: 'outline-width', //outline-width - толщина линии внешнего контура
    resize: 'resize', //resize - изменение размеров блока по ширине и высоте
    cursor: 'cursor', //cursor - стилизация курсора
    caretColor: 'caret-color' //caret-color - цвет каретки вставки
}

//STYLE
const DEFAULT_STULE = `
input {
  font: inherit;
  border: inherit;
  padding: inherit;
  background-color: inherit;
  color: inherit;
}
input:focus {
  outline: none;
}
.vector {
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
  position: absolute;
  overflow: visible !important;
}`;

SHARED = {
    document : {},
    components: [],
    images: {},
    vectors: {},
    options: {},
    fileKey: {},
    headers:{}
}

module.exports = {
    PREFIX,
    BLEND_MODE,
    CLASS_PREFIX,
    STYLE_PROPERTIES,
    BASE_URL,
    SHARED_PATH,
    FILES_PATH,
    COMPONENTS_PATH,
    IMAGES_PATH,
    DEFAULT_STULE,
    SHARED,
    ALL_TYPES,
    ELEMENT_TYPES,
    SHAPE_TYPES,
    VECTOR_TYPES, 
    GROUP_TYPES
}