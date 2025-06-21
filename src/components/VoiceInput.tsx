import React, { useState } from 'react';
import { Mic, StopCircle } from 'lucide-react';

interface VoiceInputProps {
  onVoiceInput: (text: string) => void;
}

export const VoiceInput: React.FC<VoiceInputProps> = ({ onVoiceInput }) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [textInput, setTextInput] = useState('');

  const startListening = () => {
    setIsListening(true);
    setErrorMessage('');
    
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      // This is a mock implementation since the actual Web Speech API
      // requires secure contexts (HTTPS) in most browsers
      
      // Simulate voice recognition with sample contract audit request
      setTimeout(() => {
        const sampleTranscript = "Audit this smart contract for vulnerabilities: contract TokenSale { address public owner; uint256 public price; mapping(address => bool) public whitelist; function purchase() external payable { require(whitelist[msg.sender]); require(msg.value >= price); // Send tokens... } }";
        setTranscript(sampleTranscript);
        setTextInput(sampleTranscript);
        setIsListening(false);
        onVoiceInput(sampleTranscript);
      }, 3000);
    } else {
      setErrorMessage('Speech recognition is not supported in your browser.');
      setIsListening(false);
    }
  };

  const stopListening = () => {
    setIsListening(false);
  };

  const handleTextSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (textInput.trim()) {
      setTranscript(textInput);
      onVoiceInput(textInput);
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-2xl mx-auto" data-aos="fade-up">
      <div className="mb-8 text-center w-full">
        <h3 className="text-2xl font-bold mb-4">Voice or Text Input</h3>
        <p className="text-gray-600 mb-6">
          Use voice commands or type your request to audit your smart contract
        </p>
        
        <div className="mb-8">
          <div className={`mx-auto w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 ${
            isListening 
              ? 'bg-red-100 mic-pulse'
              : 'bg-primary-100 hover:bg-primary-200'
          }`}>
            <button
              onClick={isListening ? stopListening : startListening}
              className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ${
                isListening
                  ? 'bg-red-500'
                  : 'bg-primary-500 hover:bg-primary-600'
              }`}
              disabled={isListening && !!errorMessage}
            >
              {isListening ? (
                <StopCircle size={32} className="text-white" />
              ) : (
                <Mic size={32} className="text-white" />
              )}
            </button>
          </div>
          
          {isListening && (
            <p className="text-primary-500 mt-4 animate-pulse">
              Listening...
            </p>
          )}
          
          {errorMessage && (
            <p className="text-red-500 mt-2">{errorMessage}</p>
          )}
        </div>

        <div className="w-full max-w-xl mx-auto">
          <form onSubmit={handleTextSubmit} className="space-y-4">
            <div className="relative">
              <textarea
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                placeholder="Type your contract audit request here..."
                className="w-full h-32 px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full btn-primary py-2 px-4"
            >
              Submit Text
            </button>
          </form>
        </div>
        
        {transcript && (
          <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200 text-left">
            <h4 className="text-sm font-medium text-gray-500 mb-2">Recognized input:</h4>
            <p className="text-gray-800">{transcript}</p>
          </div>
        )}
      </div>
      
      <div className="mt-4 w-full">
        <p className="text-sm text-gray-500 text-center">
          Try saying or typing: "Audit this contract for reentrancy vulnerabilities" or "Check this token contract"
        </p>
      </div>
    </div>
  );
};