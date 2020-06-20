import React from 'react';
import Library from './cipherLibrary';

class EncryptedMsg extends React.Component {

    constructor(props) {
        super(props);
        let msg = "The Red Union had been attacking the headquarters of the April Twenty-eighth Brigade for two days. Their red flags fluttered restlessly around the brigade building like flames yearning for firewood. The Red Union commander was anxious, though not because of the defenders he faced. The more than two hundred Red Guards of the April Twenty-eighth Brigade were mere greenhorns compared with the veteran Red Guards of the Red Union, which was formed at the start of the Great Proletarian Cultural Revolution in early 1966. The Red Union had been tempered by the tumultuous experience of revolutionary tours around the country and seeing Chairman Mao in the great rallies in Tiananmen Square. But the commander was afraid of the dozen or so iron stoves inside the building, filled with explosives and connected to each other by electric detonators. He couldn’t see them, but he could feel their presence like iron sensing the pull of a nearby magnet. If a defender flipped the switch, revolutionaries and counter-revolutionaries alike would all die in one giant ball of fire. And the young Red Guards of the April Twenty-eighth Brigade were indeed capable of such madness. Compared with the weathered men and women of the first generation of Red Guards, the new rebels were a pack of wolves on hot coals, crazier than crazy.";
        let key = Library.generateKey(5,10);
        let encryptedTxt = Library.encrypt(msg, key);
        console.log(encryptedTxt);
        let decryptedTxt = Library.decrypt(encryptedTxt, key);
        console.log(decryptedTxt);
        this.state = {
            key: key,   
            encryptedTxt: encryptedTxt,
            decryptedTxt: decryptedTxt, 
            showKey: false
        };
    }

    render() {
        return (
            <div className="EncryptedMsg">
                <button class="ToggleKey" 
                    onClick={() => this.setState({showKey: !this.state.showKey})}>
                    {this.state.showKey ? 'Hide encryption key': 'Show encryption key'}
                </button>
                {this.state.showKey && 
                    <input class="EncryptionKey code"
                        value={this.state.key}
                        onChange={e => {
                            this.setState({ key: e.target.value }); 
                            this.reEncrypt();}}>
                    </input>
                }
                <div className="row">
                <div className="Encrypt col-sm-12 col-md-10 col-lg-5">
                    <h2>Encrypted text: </h2>
                    <textarea className="EncryptedTxt" 
                        type="text"
                        value={this.state.encryptedTxt}
                        onChange={e => {
                            this.setState({encryptedTxt: e.target.value});
                            this.reDecrypt();}}>
                    </textarea>
                </div>
                <div className="Decrypt col-sm-12 col-md-10 col-lg-5">
                    <h2>Decrypted text: </h2>
                    <textarea className="DecryptedTxt" 
                        type="text"
                        value={this.state.decryptedTxt}
                        onChange={e => {
                            this.setState({decryptedTxt: e.target.value});
                            this.reEncrypt();}}>
                    </textarea>
                </div>
                </div>
            </div>
        );
    }

    reDecrypt = () => {
        this.setState(s => ({decryptedTxt: Library.decrypt(s.encryptedTxt, s.key)}))
    }

    reEncrypt = () => {
        this.setState(s => ({encryptedTxt: Library.encrypt(s.decryptedTxt, s.key)}))
    }
}

export default EncryptedMsg;