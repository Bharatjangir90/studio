import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Newspaper, Gauge, Users, Zap } from 'lucide-react';
import { riskAndData } from '@/lib/mock-data';
import { Badge } from './ui/badge';
import { cn } from '@/lib/utils';
import { Progress } from './ui/progress';

export function RiskAndDataSummary() {
  const { sentiment, newsImpact, socialVolume, volatility } = riskAndData;

  const getSentimentColor = (score: number) => {
    if (score > 0.5) return 'text-[hsl(var(--chart-2))]';
    if (score < -0.5) return 'text-destructive';
    return 'text-muted-foreground';
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Market Sentiment</CardTitle>
          <span className="text-muted-foreground">
            <Gauge className="h-4 w-4" />
          </span>
        </CardHeader>
        <CardContent>
          <div className={cn("text-2xl font-bold", getSentimentColor(sentiment.score))}>{sentiment.label}</div>
           <Progress value={(sentiment.score + 1) * 50} className="h-1.5 mt-2" />
        </CardContent>
      </Card>
       <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">News Impact</CardTitle>
          <span className="text-muted-foreground">
            <Newspaper className="h-4 w-4" />
          </span>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{newsImpact.score}/100</div>
          <p className="text-xs text-muted-foreground">
            Current market event impact
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Social Volume</CardTitle>
           <span className="text-muted-foreground">
            <Users className="h-4 w-4" />
          </span>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{socialVolume.label}</div>
           <p className="text-xs text-muted-foreground">
            Social media trend engagement
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Volatility (ATR)</CardTitle>
          <span className="text-muted-foreground">
            <Zap className="h-4 w-4" />
          </span>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{volatility.score}%</div>
          <p className="text-xs text-muted-foreground">
            Average True Range
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
