describe('Account', function() {
  it('should allow to sign up', function() {
    var email = element(by.model('data.email'))
    var password = element(by.model('data.password'))

    expect(email.getText()).toEqual('')
    expect(password.getText()).toEqual('')

    email.sendKeys('test@example.com')

    expect(email.getAttribute('value')).toEqual('test@example.com')

    password.sendKeys('suchsecret', protractor.Key.ENTER)

    expect(password.getAttribute('value')).toEqual('suchsecret')
  })
})
