describe('Account', function() {
  var email = by.model('data.email')
  var password = by.model('data.password')

  function random() {
    return Math.random().toString(36).substr(2, 9)
  }
  var emailValue = random() + '@' + random()
  var passwordValue = random()

  it('should prompt to sign up', function() {
    var $email = element(email)
    var $password = element(password)

    expect($email.getText()).toEqual('')
    expect($password.getText()).toEqual('')


    $email.sendKeys(emailValue)

    expect($email.getAttribute('value')).toEqual(emailValue)

    $password.sendKeys(passwordValue, protractor.Key.ENTER)

    expect($password.getAttribute('value')).toEqual(passwordValue)
  })

  it('should reject mismatching passwords', function() {
    var $password2 = element(by.model('data.password2'))
    $password2.sendKeys('suchdifferent', protractor.Key.ENTER)

    expect($password2.evaluate('hasSamePassword()')).toBe(false)
  })

  it('should allow to sign up', function() {
    var $password2 = element(by.model('data.password2'))
    $password2.clear()
    $password2.sendKeys(passwordValue)

    expect($password2.evaluate('hasSamePassword()')).toBe(true)
  })

  it('should login and redirect to inbox', function() {
    expect(browser.getCurrentUrl()).toMatch(/account$/)
    var $password2 = element(by.model('data.password2'))
    $password2.sendKeys(protractor.Key.ENTER)
    browser.sleep(350)
    expect($password2.isPresent()).toBeFalsy()
    expect(browser.getCurrentUrl()).toMatch(/inbox$/)
  })

  it('should show current version', function() {
    browser.get('/#/inbox/account')
    var $version = element(by.binding('package.version'))
    expect($version.getText()).toBe(require('../../package.json').version)
  })

  it('should log out', function() {
    element(by.css('.signup')).click()

    var $email = element(email)
    var $password = element(password)

    expect($email.getText()).toEqual('')
    expect($password.getText()).toEqual('')
  })
})
