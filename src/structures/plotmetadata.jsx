

 class PlotMetadata{
    constructor(x, y, title, xlabel, ylabel,legendName,mode,type) {
        this.x = x;
        this.y = y;
        this.title = title;
        this.xlabel = xlabel;
        this.ylabel = ylabel;
        this.legendName = legendName;
        this.ylabel = ylabel;
        this.mode = mode;
        this.type=type;
    }
}


export default function defineMetadata({x, y, title, xlabel, ylabel,legendName,mode,type}){
    return new PlotMetadata(x, y, title, xlabel, ylabel,legendName,mode,type);
}
