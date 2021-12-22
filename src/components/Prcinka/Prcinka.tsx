import React, {Component, CSSProperties} from "react";
import Photo from "./components/photo";
import Img1 from "./images/1.jpg";
import Img2 from "./images/2.jpg";
import Img3 from "./images/3.jpg";
import Img4 from "./images/4.jpg";
import Img5 from "./images/5.jpg";
import Img6 from "./images/6.jpg";
import Img7 from "./images/7.jpg";
import Img8 from "./images/8.jpg";
import Img9 from "./images/9.jpg";
import Img10 from "./images/10.jpg";
import Img11 from "./images/11.jpg";
import Img11_2 from "./images/11- 2.jpg";
import Img12 from "./images/12.jpg";
import Img13 from "./images/13.jpg";
import Img14 from "./images/14.jpg";
import Img15 from "./images/15.jpg";
import Img16 from "./images/16.jpg";
import Img17 from "./images/17.jpg";
import Img18 from "./images/18.jpg";
import Img19 from "./images/19.jpg";
import Img20 from "./images/20.jpg";
import Img21 from "./images/21.jpg";
import Img22 from "./images/22.jpg";
import Img23 from "./images/23.jpg";
import Img24 from "./images/24.jpg";
import Img25 from "./images/25.jpg";
import Img26 from "./images/26.jpg";
import Img27 from "./images/27.jpg";
import Img28 from "./images/28.jpg";
import Img29 from "./images/29.jpg";
import Img30 from "./images/30.jpg";
import Img31 from "./images/31.jpg";
import Img32 from "./images/32.jpg";
import Img33 from "./images/33.jpg";
import Img34 from "./images/34.jpg";
import Img35 from "./images/35.jpg";
import Img36 from "./images/36.jpg";
import Img37 from "./images/37.jpg";
import Img38 from "./images/38.jpg";
import Img39 from "./images/39.jpg";
import SexyImg1 from "./images/sexy/sexy1.jpg";
import SexyImg2 from "./images/sexy/sexy2.jpg";
import SexyImg3 from "./images/sexy/sexy3.jpg";
import SexyImg4 from "./images/sexy/sexy4.jpg";
import SexyImg5 from "./images/sexy/sexy5.jpg";
import SexyImg7 from "./images/sexy/sexy7.jpg";
import SexyImg9 from "./images/sexy/sexy9.jpg";
import SexyImg10 from "./images/sexy/sexy10.jpg";
import SexyImg11 from "./images/sexy/sexy11.jpg";
import SexySuper from "./images/sexy/sexy_super_6.jpg";
import './prcinka.scss';

class Prcinka extends Component {
    private _song: HTMLAudioElement;

    constructor(props: any) {
        super(props);
        this._song = new Audio(require("./song.mp3"))
    }

    private _play = () => {
        debugger;
        this._song.play();
    }

    private _pause = () => {
        this._song.pause();
    }

    private _renderLine = (image_1: string, text_1: string, style_1: CSSProperties,  image_2: string, text_2: string, style_2: CSSProperties) => {
        return <div className={"line"}>
            <div className={"item"}>
                <Photo imgSrc={image_1} rotate={"-10"} text={text_1} imgStyle={style_1} />
            </div>
            <div className={"item"}>
                <Photo imgSrc={image_2} rotate={"10"} text={text_2} imgStyle={style_2} />
            </div>
        </div>
    }

    render() {

        return (
            <div className="prcinka">
                <p className={"text welcomeText"}>Vítejte v nové sekci o mě a o nejúžasnějším člověku, kterýho sem kdy potkal. Pokud nejsi Prcinka tak zmiz neboť právě teď se stahuje trojský kůň páté úrovně a budou ti urkradena všechna hesla a přístupy. </p>
                <p className={"text text1"}>Tato sekce by měla provést Prcinku našema prvníma zážitkama, jestli jich je málo nebo hodně je jedno ale byly to ty nejkrásnější časy a to protože byly s tebou.</p>
                <p className={"text text1"}>Pokud chceš <span className={"play_button"} onClick={() => this._play()}>zde</span> si pusť muziku a pokračuj níže prcí :-)</p>
                <div className={"divider"} />
                <p className={"text dividerText"}>Myslím si že to ještě není oficiální tady :D</p>
                {this._renderLine(Img1, "Naše jedna vůbec z prvních fotek", {}, Img2, "Náš první hokej :D", {objectPosition: "0px 0px"})}
                <p className={"text dividerText"}>Tady už jo! :D</p>
                {this._renderLine(Img3, "Naše první fotka při vaření", {objectPosition: "0px 0px"}, Img4, "Náš první piknik na Doubravce", {objectPosition: "0px 0px"})}
                <p className={"text dividerText"}>Ta dovča by už bodla cooo?? :'(</p>
                {this._renderLine(Img5, "Náš první výlet přes noc", {}, Img6, "Naše první dovolená", {})}
                {this._renderLine(Img7, "Náš první polibek pod vodou", {objectPosition: "-168px 0px"}, Img8, "Náš první let letadlem", {})}
                <p className={"text dividerText"}>Minulej rok tolik dárku a dneska? :( :D</p>
                {this._renderLine(Img9, "Náš první sněhulák", {objectPosition: "0px 0px"}, Img10, "Naše první vánoce", {})}
                <p className={"text dividerText"}>Tohle si letos zopakujem</p>
                {this._renderLine(Img11, "Naše první hory na snowboardu", {}, Img11_2, "Naše první praděd", {})}
                <p className={"text dividerText"}>Vzpomínka na 4rku :(</p>
                {this._renderLine(Img12, "Naš první silvestr", {}, Img13, "Naše první miluju tě", {})}
                {this._renderLine(Img14, "Naše první vodopády", {}, Img15, "Naše první profi focení", {objectPosition: "0px 0px"})}
                {this._renderLine(Img16, "Naše první Praha", {}, Img17, "Naše první Praha #2", {})}
                <p className={"text dividerText"}>Sice nám to asi moc nešlo ale zopakoval bych Golfik :-*</p>
                {this._renderLine(Img19, "Náš první golf", {}, Img20, "Naš první piknik v horách", {})}
                <p className={"text dividerText"}>Nejlepší způsob jak sledovat hvězdy :-)</p>
                {this._renderLine(Img21, "Náš první piknik na koupališt", {}, Img22, "Náše první koukání na hvězdy", {})}
                <p className={"text dividerText"}>Tehdy naše první feraty a ani sme o tom nevěděli :D</p>
                {this._renderLine(Img23, "Naše první feraty", {}, Img24, "Našich prvních 2000 m nad mořem", {})}
                <p className={"text dividerText"}>Tady dva nečekany zážitky a to loďka a jeskyně jenom pro nás</p>
                {this._renderLine(Img25, "Naše první jízda na loďce", {}, Img26, "Naše první procházka v jeskyni", {})}
                {this._renderLine(Img27, "Naše první svatba :D", {objectPosition: "0px 0px"}, Img28, "Náš první vyhlídkový let", {})}
                <p className={"text dividerText"}>Naše klasická rutina, která nás doufám nikdy nepřestane bavit (myslím kino :D)</p>
                {this._renderLine(Img30, "Naše 42 kino s tortilama", {objectPosition: "0px -95px"}, Img31, "Náš první Adršpach", {})}
                <p className={"text dividerText"}>Všimni jak sem identifikoval tu skálu :-)</p>
                {this._renderLine(Img32, "Moje prvni extra zamilovana fotka s tebou", {}, Img33, "Naše prvni fotka s milencama", {})}
                {this._renderLine(Img34, "Naše první Brno", {}, Img35, "Naše první pořádny feraty", {})}
                <p className={"text dividerText"}>Náročnej ale neskutečně akční a dobrodružnej výlet</p>
                {this._renderLine(Img36, "Naše první Alpy", {objectPosition: "0px 0px"}, Img37, "Naše první Rakousko", {})}
                {this._renderLine(Img38, "Naše jedna z mnoha zdolaných hor", {}, Img39, "Náš první Halloween", {objectPosition: "0px 0px"})}
                <div>
                    <p className={"text text1"}>Prcinko ja tě tak zbožňuju :-*. Těším se na hromady a hromady dalších prvních věcí co spolu zažijeme.</p>
                    <div className={"divider"} />
                    <p className={"text text1"}>Konec</p>
                    <div className={"divider"} />
                    <p className={"text text1 sexySection"}>Menší sexy foto koutek</p>
                    <p className={"text dividerText"}>Můj klasickej pohled, když sem u tebe :-) :D </p>
                    {this._renderLine(SexyImg1, "", {}, SexyImg2, "", {})}
                    <p className={"text dividerText"}>Už se těším jak nám takle budeš uklízet doma :-) </p>
                    {this._renderLine(SexyImg3, "", {}, SexyImg4, "", {})}
                    <p className={"text dividerText"}>Šmííráák </p>
                    {this._renderLine(SexyImg5, "", {}, SexyImg7, "", {})}
                    <p className={"text dividerText"}>Nadrženy prase :-* </p>
                    {this._renderLine(SexyImg9, "", {}, SexyImg10, "", {})}
                    <p className={"text dividerText"}>Hihi :-)</p>
                    {this._renderLine(SexyImg11, "", {}, SexySuper, ":D", {})}
                </div>
            </div>
        )
    }
}

export default Prcinka;