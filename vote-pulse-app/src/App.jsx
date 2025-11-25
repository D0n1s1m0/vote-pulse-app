import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [votes, setVotes] = useState({
    react: 0,
    vue: 0, 
    angular: 0,
    svelte: 0
  })
  const [hasVoted, setHasVoted] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  // Загрузка данных из localStorage
  useEffect(() => {
    const savedVotes = localStorage.getItem('votePulseVotes')
    const savedHasVoted = localStorage.getItem('votePulseHasVoted')
    
    if (savedVotes) {
      setVotes(JSON.parse(savedVotes))
    }
    if (savedHasVoted) {
      setHasVoted(JSON.parse(savedHasVoted))
    }
  }, [])

  // Сохранение в localStorage
  useEffect(() => {
    localStorage.setItem('votePulseVotes', JSON.stringify(votes))
    localStorage.setItem('votePulseHasVoted', JSON.stringify(hasVoted))
  }, [votes, hasVoted])

  const handleVote = async (framework) => {
    setIsAnimating(true)
    
    // Анимация задержки
    await new Promise(resolve => setTimeout(resolve, 300))
    
    setVotes(prev => ({
      ...prev,
      [framework]: prev[framework] + 1
    }))
    setHasVoted(true)
    setIsAnimating(false)
  }

  const resetVotes = () => {
    setVotes({ react: 0, vue: 0, angular: 0, svelte: 0 })
    setHasVoted(false)
  }

  const totalVotes = Object.values(votes).reduce((sum, count) => sum + count, 0)

  const frameworks = [
    { 
      id: 'react', 
      name: 'React', 
      icon: '⚛️', 
      color: '#3B82F6',
      lightColor: '#60A5FA',
      description: 'Библиотека для веб и нативных интерфейсов'
    },
    { 
      id: 'vue', 
      name: 'Vue', 
      icon: '👽', 
      color: '#10B981',
      lightColor: '#34D399',
      description: 'Прогрессивный фреймворк'
    },
    { 
      id: 'angular', 
      name: 'Angular', 
      icon: '🕵️', 
      color: '#EF4444',
      lightColor: '#F87171',
      description: 'Фреймворк для корпоративных приложений'
    },
    { 
      id: 'svelte', 
      name: 'Svelte', 
      icon: '🐱', 
      color: '#F59E0B',
      lightColor: '#FBBF24',
      description: 'Компилируемый фреймворк'
    }
  ]

  // Стили для контейнера
  const containerStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '2rem 1rem',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  }

  const cardStyle = {
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(20px)',
    borderRadius: '2rem',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)',
    overflow: 'hidden'
  }

  return (
    <div style={containerStyle}>
      {/* Анимированный фон */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0
      }}>
        <div style={{
          position: 'absolute',
          top: '25%',
          left: '25%',
          width: '18rem',
          height: '18rem',
          background: 'rgba(139, 92, 246, 0.3)',
          borderRadius: '50%',
          filter: 'blur(80px)',
          animation: 'pulse 4s ease-in-out infinite'
        }}></div>
        <div style={{
          position: 'absolute',
          top: '33%',
          right: '25%',
          width: '18rem',
          height: '18rem',
          background: 'rgba(6, 182, 212, 0.3)',
          borderRadius: '50%',
          filter: 'blur(80px)',
          animation: 'pulse 4s ease-in-out infinite 2s'
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '25%',
          left: '33%',
          width: '18rem',
          height: '18rem',
          background: 'rgba(59, 130, 246, 0.3)',
          borderRadius: '50%',
          filter: 'blur(80px)',
          animation: 'pulse 4s ease-in-out infinite 4s'
        }}></div>
      </div>

      <div style={{
        position: 'relative',
        maxWidth: '80rem',
        margin: '0 auto',
        zIndex: 1
      }}>
        {/* Заголовок */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0.75rem',
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            borderRadius: '1rem',
            marginBottom: '1.5rem',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            <span style={{ fontSize: '2rem' }}>🗳️</span>
          </div>
          <h1 style={{
            fontSize: '3.5rem',
            fontWeight: 'bold',
            color: 'white',
            marginBottom: '1rem',
            background: 'linear-gradient(135deg, #fff, #e5e7eb)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Vote Pulse
          </h1>
          <p style={{
            fontSize: '1.25rem',
            color: 'rgba(255, 255, 255, 0.8)',
            maxWidth: '42rem',
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            Присоединяйтесь к сообществу разработчиков и выберите ваш любимый фронтенд-фреймворк
          </p>
          {totalVotes > 0 && (
            <div style={{
              marginTop: '1.5rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              borderRadius: '9999px',
              padding: '0.75rem 1.5rem',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
              <div style={{
                width: '0.5rem',
                height: '0.5rem',
                background: '#10B981',
                borderRadius: '50%',
                animation: 'pulse 2s ease-in-out infinite'
              }}></div>
              <span style={{
                color: 'rgba(255, 255, 255, 0.8)',
                fontWeight: '600'
              }}>
                Уже проголосовало: <span style={{ color: 'white' }}>{totalVotes}</span> человек
              </span>
            </div>
          )}
        </div>

        {/* Основной контент */}
        <div style={cardStyle}>
          {!hasVoted ? (
            // Экран голосования
            <div style={{ padding: '2rem' }}>
              <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <h2 style={{
                  fontSize: '2rem',
                  fontWeight: 'bold',
                  color: 'white',
                  marginBottom: '1rem'
                }}>
                  Выберите ваш фаворит
                </h2>
                <p style={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  fontSize: '1.125rem'
                }}>
                  Ваш голос поможет определить самый популярный фреймворк 2024 года
                </p>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '1.5rem'
              }}>
                {frameworks.map((framework) => (
                  <button
                    key={framework.id}
                    onClick={() => handleVote(framework.id)}
                    disabled={isAnimating}
                    style={{
                      position: 'relative',
                      padding: '2rem 1.5rem',
                      borderRadius: '1.5rem',
                      textAlign: 'left',
                      transition: 'all 0.3s ease',
                      transform: 'scale(1)',
                      background: `linear-gradient(135deg, ${framework.color}, ${framework.lightColor})`,
                      border: '2px solid rgba(255, 255, 255, 0.3)',
                      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
                      cursor: isAnimating ? 'not-allowed' : 'pointer',
                      opacity: isAnimating ? 0.7 : 1,
                      minHeight: '200px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between'
                    }}
                    onMouseOver={(e) => {
                      if (!isAnimating) {
                        e.target.style.transform = 'scale(1.05)'
                        e.target.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.4)'
                      }
                    }}
                    onMouseOut={(e) => {
                      if (!isAnimating) {
                        e.target.style.transform = 'scale(1)'
                        e.target.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)'
                      }
                    }}
                  >
                    <div>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '1rem'
                      }}>
                        <span style={{ fontSize: '2.5rem' }}>{framework.icon}</span>
                        <div style={{
                          width: '2rem',
                          height: '2rem',
                          background: 'rgba(255, 255, 255, 0.3)',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <div style={{
                            width: '1rem',
                            height: '1rem',
                            border: '2px solid white',
                            borderRadius: '50%'
                          }}></div>
                        </div>
                      </div>
                      
                      <h3 style={{
                        fontSize: '1.5rem',
                        fontWeight: 'bold',
                        color: 'white',
                        marginBottom: '0.5rem'
                      }}>
                        {framework.name}
                      </h3>
                      <p style={{
                        color: 'rgba(255, 255, 255, 0.9)',
                        fontSize: '0.875rem',
                        lineHeight: '1.5',
                        marginBottom: '1rem'
                      }}>
                        {framework.description}
                      </p>
                    </div>
                    
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      color: 'rgba(255, 255, 255, 0.8)',
                      fontSize: '0.875rem'
                    }}>
                      <span>Нажмите чтобы проголосовать</span>
                      <svg 
                        style={{ 
                          width: '1rem', 
                          height: '1rem', 
                          marginLeft: '0.5rem',
                          transition: 'transform 0.2s ease'
                        }} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            // Экран результатов
            <div style={{ padding: '2rem' }}>
              <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <h2 style={{
                  fontSize: '2.5rem',
                  fontWeight: 'bold',
                  color: 'white',
                  marginBottom: '1rem'
                }}>
                  📊 Результаты голосования
                </h2>
                <p style={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  fontSize: '1.125rem'
                }}>
                  Текущее распределение голосов сообщества
                </p>
              </div>

              <div style={{ marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {frameworks.map((framework) => {
                  const count = votes[framework.id]
                  const percentage = totalVotes > 0 ? ((count / totalVotes) * 100).toFixed(1) : 0
                  const barWidth = totalVotes > 0 ? (count / totalVotes) * 100 : 0
                  
                  return (
                    <div 
                      key={framework.id}
                      style={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        backdropFilter: 'blur(10px)',
                        borderRadius: '1.5rem',
                        padding: '1.5rem',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.border = '1px solid rgba(255, 255, 255, 0.3)'
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.border = '1px solid rgba(255, 255, 255, 0.1)'
                      }}
                    >
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '1rem'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                          <div style={{
                            padding: '0.75rem',
                            borderRadius: '1rem',
                            background: `linear-gradient(135deg, ${framework.color}, ${framework.lightColor})`,
                            boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)'
                          }}>
                            <span style={{ fontSize: '1.5rem' }}>{framework.icon}</span>
                          </div>
                          <div>
                            <h3 style={{
                              fontSize: '1.25rem',
                              fontWeight: 'bold',
                              color: 'white',
                              marginBottom: '0.25rem'
                            }}>
                              {framework.name}
                            </h3>
                            <p style={{
                              color: 'rgba(255, 255, 255, 0.6)',
                              fontSize: '0.875rem'
                            }}>
                              {framework.description}
                            </p>
                          </div>
                        </div>
                        
                        <div style={{ textAlign: 'right' }}>
                          <div style={{
                            fontSize: '1.5rem',
                            fontWeight: 'bold',
                            color: 'white',
                            marginBottom: '0.25rem'
                          }}>
                            {count}
                          </div>
                          <div style={{
                            fontSize: '1.125rem',
                            fontWeight: '600',
                            color: '#22D3EE'
                          }}>
                            {percentage}%
                          </div>
                        </div>
                      </div>
                      
                      {/* Progress bar */}
                      <div style={{
                        width: '100%',
                        background: 'rgba(255, 255, 255, 0.1)',
                        borderRadius: '9999px',
                        height: '0.75rem',
                        overflow: 'hidden'
                      }}>
                        <div 
                          style={{
                            height: '100%',
                            borderRadius: '9999px',
                            background: `linear-gradient(90deg, ${framework.color}, ${framework.lightColor})`,
                            boxShadow: '0 5px 15px rgba(0, 0, 0, 0.2)',
                            transition: 'width 1s ease-out',
                            width: `${barWidth}%`
                          }}
                        ></div>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Статистика */}
              <div style={{
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                borderRadius: '1.5rem',
                padding: '1.5rem',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                marginBottom: '1.5rem'
              }}>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                  gap: '1.5rem',
                  textAlign: 'center'
                }}>
                  <div>
                    <div style={{
                      fontSize: '1.5rem',
                      fontWeight: 'bold',
                      color: 'white',
                      marginBottom: '0.5rem'
                    }}>
                      {totalVotes}
                    </div>
                    <div style={{
                      color: 'rgba(255, 255, 255, 0.6)',
                      fontSize: '0.875rem'
                    }}>
                      Всего голосов
                    </div>
                  </div>
                  <div>
                    <div style={{
                      fontSize: '1.5rem',
                      fontWeight: 'bold',
                      color: 'white',
                      marginBottom: '0.5rem'
                    }}>
                      {Math.max(...Object.values(votes))}
                    </div>
                    <div style={{
                      color: 'rgba(255, 255, 255, 0.6)',
                      fontSize: '0.875rem'
                    }}>
                      Максимум голосов
                    </div>
                  </div>
                  <div>
                    <div style={{
                      fontSize: '1.5rem',
                      fontWeight: 'bold',
                      color: 'white',
                      marginBottom: '0.5rem'
                    }}>
                      {Object.values(votes).filter(v => v > 0).length}
                    </div>
                    <div style={{
                      color: 'rgba(255, 255, 255, 0.6)',
                      fontSize: '0.875rem'
                    }}>
                      Фреймворков с голосами
                    </div>
                  </div>
                </div>
              </div>

              {/* Кнопка сброса */}
              <div style={{ textAlign: 'center' }}>
                <button
                  onClick={resetVotes}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '1rem 2rem',
                    background: 'linear-gradient(135deg, #4B5563, #374151)',
                    color: 'white',
                    fontWeight: '600',
                    borderRadius: '1rem',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    fontSize: '1.125rem'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.transform = 'scale(1.05)'
                    e.target.style.background = 'linear-gradient(135deg, #374151, #1F2937)'
                  }}
                  onMouseOut={(e) => {
                    e.target.style.transform = 'scale(1)'
                    e.target.style.background = 'linear-gradient(135deg, #4B5563, #374151)'
                  }}
                >
                  <svg style={{ width: '1.25rem', height: '1.25rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Сбросить результаты
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Футер */}
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <p style={{
            color: 'rgba(255, 255, 255, 0.6)',
            fontSize: '0.875rem'
          }}>
            Создано с ❤️ для сообщества разработчиков
          </p>
        </div>
      </div>
    </div>
  )
}

export default App