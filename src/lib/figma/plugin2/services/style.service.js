class StyleService {

    //TEXT
    textTransform = ''; // text-transform - преобразование текста  
    whiteSpace = ''; // white-space - обработка пробелов между словами
    tabsize = ''; // tab-size - настройка табуляции
    wordBreak = ''; // word-break - перенос длинных слов в строках
    lineBreak = ''; // line-break - разрыв строки
    hyphens = ''; // hyphens - расстановка переносов
    overflowWrap = ''; // overflow-wrap - переполнение блока-обертки
    wordWrap = ''; // word-wrap - переполнение блока-обертки
    textAlign = ''; // text-align - выравнивание текста
    textAlignAll = ''; // text-align-all - выравнивание текста по умолчанию
    textAlignLast = ''; // text-align-last - выравнивание последней строки
    wordSpacing = ''; // word-spacing - промежутки между словами
    letterSpacing = ''; // letter-spacing - трекинг
    textIndent = ''; // text-indent - отступ первой строки

    //TEXT DECORATION
    textDecorationLine = ''; // text-decoration-line - вид линии оформления
    textDecorationStyle = ''; // text-decoration-style - стиль линии оформления
    textDecorationColor = ''; // text-decoration-color - цвет линии оформления
    textDecoration = ''; // text-decoration - краткая запись свойств линии оформления
    textUnderlinePosition = ''; // text-underline-position - расположение линии оформления
    textShadow = ''; // text-shadow - тень текста

    //FONTS
    fontFamily = ''; // font-family - семейство шрифтов
    fontWeight = ''; // font-weight - насыщенность шрифта
    fontStretch = ''; // font-stretch - ширина шрифта
    fontStyle = ''; // font-style - стиль начертания шрифта
    fontSize = ''; // font-size - размер шрифта
    fontSizeAdjust = ''; // font-size-adjust - относительный размер шрифта
    font = ''; // font - краткая запись свойств шрифта
    fontSynthesis = ''; // font-synthesis - управление синтезом шрифтов
    fontFeatureSettings = ''; // font-feature-settings - низкоуровневое управление настройками шрифтов
    fontKerning = ''; // font-kerning - кернинг
    fontVariant = ''; // font-variant - общее сокращение для рендеринга шрифтов
    fontVariantCaps = ''; // font-variant-caps - преобразование в заглавные буквы
    fontVariantEastAsian = ''; // font-variant-east-asian - визуализация восточноазиатского текста
    fontVariantLigatures = ''; // font-variant-ligatures - лигатуры
    fontVariantNumeric = ''; // font-variant-numeric - форматирование цифр
    fontVariantPosition = ''; // font-variant-position - подстрочные и надстрочные формы

    //TABLES
    borderCollapse = ''; // border-collapse - удаление промежутка между рамками ячеек
    borderSpacing = ''; // border-spacing - увеличение промежутка между рамками ячеек
    captionSide = ''; // caption-side - управление местоположением подписи к таблице
    emptyCells = ''; // empty-cells - скрытие пустых ячеек
    tableLayout = ''; // table-layout - компоновка макета таблицы

    //LISTS
    listStyle = '';  // list-style - краткая форма задания стилей списка
    listStyleType = '';  // list-style-type - тип маркера списка
    listStyleImage = '';  // list-style-image - маркер-изображение для элементов списка
    listStylePosition = '';  // list-style-position - местоположение маркера списка

    //BLOCK MODEL
    display = ''; //display - тип генерируемого элементом контейнера
    height = ''; //height - высота элемента
    maxHeight = ''; //max-height - максимальная высота
    minHeight = ''; //min-height - минимальная высота
    width = ''; //width - ширина элемента
    maxWidth = ''; //max-width - максимальная ширина
    minWidth = ''; //min-width - минимальная ширина
    margin = ''; //margin - внешний отступ между рамкой элемента и другими элементами
    marginBottom = ''; //margin-bottom - внешний отступ снизу
    marginLeft = '';//margin-left - внешний отступ слева
    marginRight = ''; //margin-right - внешний отступ справа
    marginTop = ''; //margin-top - внешний отступ сверху
    padding = ''; //padding - внутренний отступ между содержимым и рамкой элемента
    paddingBottom = ''; //padding-bottom - внутренний отступ снизу
    paddingLeft = ''; //padding-left - внутренний отступ слева
    paddingRight = ''; //padding-right - внутренний отступ справа
    paddingTop = ''; //padding-top - внутренний отступ сверху
    boxSizing = ''; //box-sizing - управление расчётом ширины и высоты элемента с учётом внутренних отступов и толщины рамки
    verticalAlign = ''; //vertical-align - вертикальное позиционирование
    lineHeight = ''; //line-height - высота строки

    //POSITIONING AND FLOW
    position = ''; //position - управление положением элементов
    bottom = ''; //bottom - смещение относительно нижней стороны блока-контейнера
    left = ''; //left - смещение относительно левой стороны блока-контейнера
    right = ''; //right - смещение относительно правой стороны блока-контейнера
    top = ''; //top - смещение относительно верхней стороны блока-контейнера
    float = ''; //float - перемещение элементов с выравниванием по левому или правому краю блока-контейнера
    clear = ''; //clear - отмена обтекания с одной или обоих сторон элемента
    zIndex = ''; //z-index - наложение элементов
    objectFit = '';//object-fit - управляет заполнением контейнера для содержимого замещаемых элементов
    objectPosition = ''; //object-position - позиционирует содержимое замещаемых элементов внутри контейнера относительно осей X и Y

    //PRUNING
    textOverflow = ''; // text-overflow - обрезка строк
    clip = ''; // clip - обрезка части элемента
    overflow = ''; //overflow - добавление полос прокрутки или скрытие содержимого
    overflowX = ''; //overflow-x - обрезка правого края контента внутри блока в случае его переполнения
    overflowY = ''; //overflow-y - обрезка нижнего края контента внутри блока в случае его переполнения

    //ELEMENT VISIBILITY
    opacity = ''; //opacity - прозрачность элемента
    visibility = ''; //visibility - управление видимостью элемента

    //BACKGROUND
    background = ''; //background - задание фона элемента одним свойством
    backgroundColor = ''; //background-color - цвет фона
    backgroundImage = ''; //background-image - фоновое изображение
    backgroundPosition = ''; //background-position - положение фонового изображения
    backgroundRepeat = ''; //background-repeat - повтор фонового изображения
    backgroundSize = ''; //background-size - размер фонового изображения
    backgroundAttachment = ''; //background-attachment - фиксация фонового изображения на месте
    backgroundClip = ''; //background-clip - заполнение фоном отступов и границ элемента
    backgroundOrigin = ''; //background-origin - положение фонового изображения относительно его родительского блока
    backgroundBlendMode = '';// режим смешивания фоновых слоёв, заданных в свойстве background-image //background-blend-mode - режим смешивания фоновых слоёв, заданных в свойстве background-image

    //BORDER
    border = ''; //border - задание рамки элемента одним свойством
    borderWidth = ''; //border-width - толщина рамки
    borderStyle = ''; //border-style - стиль рамки
    borderColor = ''; //border-color - цвет рамки
    borderBottom = ''; //border-bottom - задание нижней рамки одним свойством
    borderBottomWidth = ''; //border-bottom-width - ширина нижней рамки
    borderBottomStyle = ''; //border-bottom-style - стиль нижней рамки
    borderBottomColor = ''; //border-bottom-color - цвет нижней рамки
    borderLeft = '';//border-left - задание левой рамки одним свойством
    borderLeftWidth = ''; //border-left-width - толщина левой рамки
    borderLeftStyle = ''; //border-left-style - стиль левой рамки
    borderLeftColor = ''; //border-left-color - цвет левой рамки
    borderTop = ''; //border-top - задание верхней рамки одним свойством
    borderTopWidth = ''; //border-top-width - толщина верхней рамки
    borderTopStyle = ''; //border-top-style - стиль верхней рамки
    borderTopColor = ''; //border-top-color - цвет верхней рамки
    borderRight = ''; //border-right - задание правой рамки одним свойством
    borderRightWidth = ''; //border-right-width - толщина правой рамки
    borderRightStyle = ''; //border-right-style - стиль правой рамки
    borderRightColor = '';//border-right-color - цвет правой рамки
    borderRadius = '';//border-radius - задание радиуса скругления углов рамки одним свойством
    borderTopLeftRadius = ''; //border-top-left-radius - верхний левый радиус
    borderTopRightRadius = ''; //border-top-right-radius - верхний правый радиус
    borderBottomLeftRadius = ''; //border-bottom-left-radius - нижний левый радиус
    borderBottomRightRadius = ''; //border-bottom-right-radius - нижний правый радиус
    borderImage = ''; //border-image - задание рамки-изображения одним свойством
    borderImageOutset = ''; //border-image-outset - смещение рамки-изображения
    borderImageRepeat = ''; //border-image-repeat - повтор рамки-изображения
    borderImageSlice = ''; //border-image-slice - размер частей рамки-изображения
    borderImageSource = ''; //border-image-source - источник рамки-изображения
    borderImageWidth = ''; //border-image-width - толщина рамки-изображения

    //GENERATED CONTENT
    content = ''; //content - добавление генерируемого содержимого
    counterincrement = ''; //counter-increment - приращение счётчика
    counterReset = ''; //counter-reset - имя счётчика
    quotes = ''; //quotes - добавление кавычек заданного типа

    //SHADOW
    boxShadow = '';//box-shadow - тень блока

    //TRANSITIONS
    transition = ''; //transition - краткая запись перехода
    transitionDelay = ''; //transition-delay - задержка перехода
    transitionDuration = ''; //transition-duration - продолжительность перехода
    transitionProperty = ''; //transition-property - название свойств, к которым будет применен перехода
    transitionTimingFunction = '';  //transition-timing-function - функция перехода

    //TRANSFORMATIONS
    backfaceVisibility = ''; //backface-visibility - видимость обратной стороны элемента
    perspective = ''; //perspective - активация 3D-пространства для элемента
    perspectiveOrigin = ''; //perspective-origin - точка 3D-трансформации
    transform = ''; //transform - функция 2D-трансформации
    transformOrigin = ''; //transform-origin - точка 2D-трансформации
    transformStyle = ''; //transform-style - стиль 3D-преобразований

    //ANIMATION
    animation = ''; //animation - краткая запись всех свойств анимации
    animationName = ''; //animation-name - название анимации
    animationDuration = ''; //animation-duration - длительность анимации
    animationDelay = ''; //animation-delay - задержка анимации
    animationDirection = ''; //animation-direction - направление повтора анимации
    animationFillMode = ''; //animation-fill-mode - состояние элемента до и после воспроизведения анимации
    animationIterationCount = ''; //animation-iteration-count - число повторов анимации
    animationPlayState = ''; //animation-play-state - остановка анимации
    animationTimingFunction = ''; //animation-timing-function - функция изменения скорости анимации во времени

    //FLEXBOX
    flex = '';// flex - задание базовой ширины и трансформации элемента одним свойством
    flexBasis = ''; // flex-basis - базовая ширина элемента
    flexGrow = '';  // flex-grow - коэффициент увеличения ширины flex-элемента
    flexShrink = ''; // flex-shrink - коэффициент уменьшения ширины flex-элемента
    flexFlow = ''; // flex-flow - краткая запись направления и многострочности
    flexDirection = ''; // flex-direction - направление главной оси flex-контейнера
    flexWrap = ''; // flex-wrap - многострочность элементов
    alignContent = ''; // align-content - многострочное выравнивание
    alignItems = ''; // align-items - выравнивание элементов по вертикали
    alignSelf = ''; // align-self - выравнивание отдельных элементов
    order = ''; // order - порядок отображения элементов
    justifyContent = ''; // justify-content - выравнивание элементов по горизонтали

    //SPEAKERS
    columnRule = ''; //column-rule - краткая запись стилей разделительной линии
    columnRuleWidth = ''; //column-rule-width - толщина разделительной линии
    columnRuleStyle = ''; //column-rule-style - тип разделительной линии
    columnRuleColor = ''; //column-rule-color - цвет разделительной линии
    columns = ''; //columns - задание колонок с помощью одного свойства
    columnCount = ''; //column-count - количество колонок
    columnWidth = ''; //column-width - ширина колонок
    columnGap = ''; //column-gap - ширина пустого пространства между колонками
    columnSpan = ''; //column-span - позиционирование элемента на несколько колонок
    columnFill = ''; //column-fill - заполнение колонок содержимым

    //PRINTING DOCUMENTS
    pageBreakAfter = '';//page-break-after - наличие или отсутствие разрыва страницы после выбранного элемента
    pageBreakBefore = '';//page-break-before - наличие или отсутствие разрыва страницы перед выбранным элементом
    pageBreakInside  = '';//page-break-inside - наличие или отсутствие разрыва страницы внутри выбранного элемента

    //GRID
    gap = ''; //gap - сокращенная запись промежутков между элементами сетки
    grid = ''; //grid - краткая запись сетки
    gridArea = ''; //grid-area - сокращенная запись свойств размещения с помощью линий сетки
    gridAutoColumns = ''; //grid-auto-columns - установка размера автоматических столбцов сетки
    gridAutoFlow = '';//grid-auto-flow - автоматическое размещение элементов сетки
    gridAutoRows = '';//grid-auto-rows - установка размера неявных строк сетки
    gridColumn = '';//grid-column - краткая запись свойств размещения элементов сетки в столбце
    gridColumnEnd = '';//grid-column-end - конечная линия столбца
    columnGap = ''; //column-gap - промежутки между столбцами сетки
    gridColumnStart = '';//grid-column-start - начальная линия столбца
    gridRow = '';//grid-row - краткая запись свойств размещения элементов сетки в строке
    gridRowEnd = '';//grid-row-end - конечная линия строки
    rowGap = ''; //row-gap - промежутки между строками сетки
    gridRowStart = '';//grid-row-start - начальная линия строки
    gridTemplate = '';//grid-template - краткая запись явной сетки
    gridTemplateAreas = '';//grid-template-areas - задание именованных областей сетки
    gridTemplateColumns = '';//grid-template-columns - задание столбцов сетки
    gridTemplateRows = '';//grid-template-rows - задание строк сетки

    //USER INTERFACE
    outline = ''; //outline - задание внешнего контура одним свойством
    outlineColor = ''; //outline-color - цвет внешнего контура
    outlineOffset = ''; //outline-offset - смещение внешнего контура
    outlineStyle = ''; //outline-style - стиль линии внешнего контура
    outlineWidth = ''; //outline-width - толщина линии внешнего контура
    resize = ''; //resize - изменение размеров блока по ширине и высоте
    cursor = ''; //cursor - стилизация курсора
    caretColor = ''; //caret-color - цвет каретки вставки

    style = {}

    set Style(style) { this.style = style;}
    get Style() { return this.style }

    set BackgroundColor(blendMode) {
        
    }

    get BackgroundColor() { return this.backgroundColor }

    set BackgroundBlendMode(blendMode) {
        let bgBlendMode = blendMode.toLowerCase()
        if(bgBlendMode.indexOf('_') !== -1) {
            bgBlendMode = bgBlendMode.replace(/_/g, '-');
        }
        this.backgroundBlendMode = bgBlendMode;
    }

    get BackgroundBlendMode() { return this.backgroundBlendMode }

    constructor() {}

    init(shape) {
        // console.log('INIT STYLE',shape);
        const {
            backgroundColor,
            absoluteBoundingBox,
            blendMode,
            constraints,
            effects,
            fills,
            strokeAlign,
            strokeWeight,
            type,
            clipsContent,
            prototypeDevice
        } = shape;

        if (blendMode) {
            this.BackgroundBlendMode = blendMode;
        }

        if(backgroundColor) {
            this.BackgroundColor = backgroundColor;
        }

    }

    getStyle() {
        return this.Style;
    }
}

module.exports = StyleService