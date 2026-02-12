using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;

public class TokenService : ITokenService
{
    private readonly byte[] _key;
    private readonly string _issuer;
    private readonly string _audience;

    public TokenService(IConfiguration configuration)
    {
        _key = Encoding.UTF8.GetBytes(configuration["Jwt:Key"]);
        _issuer = configuration["Jwt:Issuer"];
        _audience = configuration["Jwt:Audience"];

        if (_key.Length < 32)
            throw new ArgumentException("JWT secret must be at least 256 bits (32 bytes).");
    }

    public string GenerateAccessToken(ApplicationUser user, UserLoginInfo info)
    {
        if (user == null)
            throw new ArgumentNullException(nameof(user));

        var now = DateTime.UtcNow;

        var claims = new List<Claim>
        {
            new Claim(JwtRegisteredClaimNames.Sub, user.Id),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            new Claim(JwtRegisteredClaimNames.Iat,
                new DateTimeOffset(now).ToUnixTimeSeconds().ToString(),
                ClaimValueTypes.Integer64)
        };

        if (!string.IsNullOrEmpty(info.ProviderKey))
        {
            claims.Add(new Claim("github_id", info.ProviderKey));
        }

        var credentials = new SigningCredentials(
            new SymmetricSecurityKey(_key),
            SecurityAlgorithms.HmacSha256
        );

        var token = new JwtSecurityToken(
            issuer: _issuer,
            audience: _audience,
            claims: claims,
            notBefore: now,
            expires: now.AddMinutes(10),
            signingCredentials: credentials
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}
