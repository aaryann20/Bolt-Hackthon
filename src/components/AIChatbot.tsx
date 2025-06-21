import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, Bot, User, Lightbulb, Code, Shield, Zap, X, Minimize2, Maximize2 } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

const AIChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: "Hello! I'm your AI Smart Contract Assistant. I can help you with:\n\n• Contract security analysis\n• Vulnerability explanations\n• Best practices\n• Gas optimization\n• Solidity coding help\n• Audit recommendations\n\nWhat would you like to know about smart contracts?",
      timestamp: new Date(),
      suggestions: [
        "What is reentrancy vulnerability?",
        "How to optimize gas usage?",
        "Explain access control patterns",
        "Best practices for DeFi contracts"
      ]
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateBotResponse = (userMessage: string): { content: string; suggestions?: string[] } => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('reentrancy')) {
      return {
        content: "**Reentrancy Vulnerability** is one of the most critical smart contract vulnerabilities.\n\n**What it is:**\nOccurs when a contract calls an external contract before updating its internal state, allowing the external contract to call back and exploit the inconsistent state.\n\n**Example:**\n```solidity\n// VULNERABLE CODE\nfunction withdraw() external {\n    uint amount = balances[msg.sender];\n    (bool success,) = msg.sender.call{value: amount}(\"\");\n    balances[msg.sender] = 0; // State change AFTER external call\n}\n```\n\n**Prevention:**\n1. Use Checks-Effects-Interactions pattern\n2. Implement ReentrancyGuard\n3. Update state before external calls\n\n**Secure version:**\n```solidity\nfunction withdraw() external nonReentrant {\n    uint amount = balances[msg.sender];\n    balances[msg.sender] = 0; // State change FIRST\n    (bool success,) = msg.sender.call{value: amount}(\"\");\n    require(success, \"Transfer failed\");\n}\n```",
        suggestions: [
          "Show me more vulnerability types",
          "How to implement ReentrancyGuard?",
          "What is Checks-Effects-Interactions?",
          "Real-world reentrancy attacks"
        ]
      };
    }
    
    if (message.includes('gas') && message.includes('optim')) {
      return {
        content: "**Gas Optimization Techniques** for Smart Contracts:\n\n**1. Storage Optimization:**\n• Pack structs efficiently\n• Use appropriate data types\n• Minimize storage writes\n\n**2. Loop Optimization:**\n```solidity\n// BAD\nfor (uint i = 0; i < array.length; i++) {\n    // operations\n}\n\n// GOOD\nuint length = array.length;\nfor (uint i = 0; i < length; i++) {\n    // operations\n}\n```\n\n**3. Function Modifiers:**\n• Use `external` instead of `public` when possible\n• Mark functions as `view` or `pure` when appropriate\n\n**4. Short-circuit Evaluation:**\n```solidity\n// Use && and || effectively\nrequire(condition1 && condition2, \"Error\");\n```\n\n**5. Batch Operations:**\n• Process multiple items in single transaction\n• Use multicall patterns\n\n**Estimated Savings:** 20-50% gas reduction possible!",
        suggestions: [
          "Show storage packing examples",
          "Explain function visibility",
          "What are view vs pure functions?",
          "Advanced optimization techniques"
        ]
      };
    }
    
    if (message.includes('access control')) {
      return {
        content: "**Access Control Patterns** in Smart Contracts:\n\n**1. Ownable Pattern:**\n```solidity\nimport \"@openzeppelin/contracts/access/Ownable.sol\";\n\ncontract MyContract is Ownable {\n    function sensitiveFunction() external onlyOwner {\n        // Only owner can call\n    }\n}\n```\n\n**2. Role-Based Access Control (RBAC):**\n```solidity\nimport \"@openzeppelin/contracts/access/AccessControl.sol\";\n\ncontract MyContract is AccessControl {\n    bytes32 public constant ADMIN_ROLE = keccak256(\"ADMIN_ROLE\");\n    bytes32 public constant MINTER_ROLE = keccak256(\"MINTER_ROLE\");\n    \n    function mint() external onlyRole(MINTER_ROLE) {\n        // Only minters can call\n    }\n}\n```\n\n**3. Multi-Signature:**\n• Require multiple signatures for critical operations\n• Prevents single point of failure\n\n**4. Time-locks:**\n• Delay execution of critical functions\n• Allows time for community review\n\n**Best Practices:**\n• Use OpenZeppelin's battle-tested implementations\n• Implement proper role management\n• Consider upgradeability implications",
        suggestions: [
          "How to implement multi-sig?",
          "Explain timelock contracts",
          "Role hierarchy best practices",
          "Access control for upgradeable contracts"
        ]
      };
    }
    
    if (message.includes('defi') || message.includes('best practices')) {
      return {
        content: "**DeFi Smart Contract Best Practices:**\n\n**Security First:**\n• Always use latest Solidity version\n• Implement comprehensive testing\n• Get professional audits\n• Use established libraries (OpenZeppelin)\n\n**Oracle Security:**\n```solidity\n// Use multiple price feeds\nfunction getPrice() external view returns (uint256) {\n    uint256 price1 = oracle1.getPrice();\n    uint256 price2 = oracle2.getPrice();\n    require(abs(price1 - price2) < threshold, \"Price deviation\");\n    return (price1 + price2) / 2;\n}\n```\n\n**Flash Loan Protection:**\n• Implement proper slippage protection\n• Use time-weighted average prices\n• Add flash loan detection\n\n**Liquidity Management:**\n• Implement emergency pause mechanisms\n• Use circuit breakers for large withdrawals\n• Monitor pool health\n\n**Governance:**\n• Implement timelock for parameter changes\n• Use multi-sig for critical operations\n• Consider decentralized governance\n\n**Testing:**\n• Fork mainnet for testing\n• Simulate extreme market conditions\n• Test with various token types",
        suggestions: [
          "Oracle manipulation attacks",
          "Flash loan attack prevention",
          "MEV protection strategies",
          "Liquidity pool security"
        ]
      };
    }
    
    if (message.includes('vulnerability') || message.includes('security')) {
      return {
        content: "**Common Smart Contract Vulnerabilities:**\n\n**1. Reentrancy** - External calls before state updates\n**2. Integer Overflow/Underflow** - Use SafeMath or Solidity 0.8+\n**3. Access Control Issues** - Missing or improper permissions\n**4. Front-running** - Transaction ordering attacks\n**5. Oracle Manipulation** - Price feed attacks\n**6. Flash Loan Attacks** - Exploiting temporary liquidity\n**7. Denial of Service** - Gas limit attacks\n**8. Timestamp Dependence** - Block.timestamp manipulation\n**9. Uninitialized Storage** - Dangerous default values\n**10. Delegatecall Injection** - Proxy pattern vulnerabilities\n\n**Detection Tools:**\n• Slither - Static analysis\n• Mythril - Symbolic execution\n• Echidna - Fuzzing\n• Manticore - Dynamic analysis\n\n**Prevention:**\n• Follow security checklists\n• Use established patterns\n• Implement proper testing\n• Get professional audits",
        suggestions: [
          "Explain front-running attacks",
          "How to prevent oracle manipulation?",
          "What is delegatecall injection?",
          "Security audit checklist"
        ]
      };
    }
    
    if (message.includes('audit') || message.includes('checklist')) {
      return {
        content: "**Smart Contract Audit Checklist:**\n\n**Pre-Audit Preparation:**\n✅ Complete unit tests (>95% coverage)\n✅ Integration tests\n✅ Documentation complete\n✅ Code freeze\n✅ Static analysis tools run\n\n**Security Review Areas:**\n\n**1. Access Control:**\n• Function visibility correct\n• Role-based permissions\n• Owner privileges limited\n\n**2. Input Validation:**\n• All inputs validated\n• Proper error handling\n• Overflow protection\n\n**3. External Calls:**\n• Reentrancy protection\n• Gas limit considerations\n• Return value checks\n\n**4. State Management:**\n• State transitions secure\n• Storage layout correct\n• Initialization proper\n\n**5. Economic Logic:**\n• Token economics sound\n• Fee calculations correct\n• Slippage protection\n\n**Post-Audit:**\n• Address all findings\n• Re-test after fixes\n• Final security review\n• Deploy with monitoring",
        suggestions: [
          "How to choose an auditor?",
          "Audit cost estimation",
          "Post-audit monitoring",
          "Bug bounty programs"
        ]
      };
    }
    
    // Default response for unrecognized queries
    return {
      content: "I understand you're asking about smart contract development. Let me help you with that!\n\nI can provide detailed information about:\n\n🔒 **Security Topics:**\n• Vulnerability types and prevention\n• Audit processes and checklists\n• Best security practices\n\n⚡ **Optimization:**\n• Gas optimization techniques\n• Performance improvements\n• Code efficiency\n\n🏗️ **Development:**\n• Solidity coding patterns\n• Architecture design\n• Testing strategies\n\n💰 **DeFi Specific:**\n• Oracle security\n• Flash loan protection\n• Liquidity management\n\nCould you be more specific about what you'd like to learn?",
      suggestions: [
        "What is reentrancy vulnerability?",
        "How to optimize gas usage?",
        "Explain access control patterns",
        "DeFi security best practices"
      ]
    };
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const response = generateBotResponse(inputValue);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: response.content,
        timestamp: new Date(),
        suggestions: response.suggestions
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatMessage = (content: string) => {
    // Simple markdown-like formatting
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/```([\s\S]*?)```/g, '<pre class="bg-gray-100 p-3 rounded-lg overflow-x-auto text-sm"><code>$1</code></pre>')
      .replace(/`(.*?)`/g, '<code class="bg-gray-100 px-1 rounded text-sm">$1</code>')
      .replace(/•/g, '•')
      .replace(/\n/g, '<br>');
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-primary-500 hover:bg-primary-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      </div>
    );
  }

  return (
    <div className={`fixed bottom-6 right-6 z-50 bg-white rounded-xl shadow-2xl border border-gray-200 transition-all duration-300 ${
      isMinimized ? 'w-80 h-16' : 'w-96 h-[600px]'
    }`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-t-xl">
        <div className="flex items-center">
          <Bot className="w-5 h-5 mr-2" />
          <h3 className="font-semibold">AI Contract Assistant</h3>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-1 hover:bg-white/20 rounded"
          >
            {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 hover:bg-white/20 rounded"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 h-96">
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                    <div className={`flex items-start space-x-2 ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        message.type === 'user' ? 'bg-primary-500' : 'bg-gray-200'
                      }`}>
                        {message.type === 'user' ? (
                          <User className="w-4 h-4 text-white" />
                        ) : (
                          <Bot className="w-4 h-4 text-gray-600" />
                        )}
                      </div>
                      <div className={`rounded-lg p-3 ${
                        message.type === 'user' 
                          ? 'bg-primary-500 text-white' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        <div 
                          className="text-sm"
                          dangerouslySetInnerHTML={{ __html: formatMessage(message.content) }}
                        />
                        {message.suggestions && (
                          <div className="mt-3 space-y-2">
                            {message.suggestions.map((suggestion, index) => (
                              <button
                                key={index}
                                onClick={() => handleSuggestionClick(suggestion)}
                                className="block w-full text-left text-xs bg-white/20 hover:bg-white/30 rounded px-2 py-1 transition-colors"
                              >
                                {suggestion}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className={`text-xs text-gray-500 mt-1 ${message.type === 'user' ? 'text-right' : 'text-left'}`}>
                      {message.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-start space-x-2">
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                      <Bot className="w-4 h-4 text-gray-600" />
                    </div>
                    <div className="bg-gray-100 rounded-lg p-3">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-gray-200 p-4">
            <div className="flex space-x-2">
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything about smart contracts..."
                className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm resize-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                rows={2}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
                className="bg-primary-500 hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed text-white p-2 rounded-lg transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AIChatbot;